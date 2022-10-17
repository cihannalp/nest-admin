import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
  Param,
  Put,
  Delete,
  Query,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { User } from './models/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserUpdateDto } from './models/user-update.dto';
import { PaginatedResult } from 'src/common/paginated-result.interface';
import { AuthService } from 'src/auth/auth.service';
import { Request } from 'express';
import { HasPermission } from 'src/permission/has-permission.decorator';

@Controller('users')
@UseGuards(AuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}
  @HasPermission('users')
  @Get()
  async all(@Query('page') page: number = 1): Promise<PaginatedResult> {
    return await this.userService.paginate(page, ['role']);
  }

  @HasPermission('users')
  @Post('create')
  async create(@Body() body): Promise<User> {
    const password = await bcrypt.hash('1234', 12);
    const { role_id, ...data } = body;
    return this.userService.create({
      ...data,
      password,
      role: { id: role_id },
    });
  }
  @HasPermission('users')
  @Get(':id')
  async get(@Param('id') id: number) {
    return this.userService.findOneById(id, ['role']);
  }
  @HasPermission('users')
  @Put(':id')
  async update(@Param('id') id: number, @Body() body: UserUpdateDto) {
    const { role_id, ...data } = body;

    await this.userService.update(id, {
      ...data,
      role: {
        id: role_id,
      },
    });
    return this.userService.findOneById(id);
  }
  @HasPermission('users')
  @Put('update/info')
  async updateInfo(@Req() request: Request, @Body() body: UserUpdateDto) {
    const id = await this.authService.userId(request);

    await this.userService.update(id, body);

    return this.userService.findOneById(id);
  }
  @HasPermission('users')
  @Post('update/password')
  async updatePassword(
    @Req() request: Request,
    @Body('password') password: string,
    @Body('passwordConfirm') passwordConfirm: string,
  ) {
    if (password !== passwordConfirm) {
      throw new BadRequestException('Password does not match');
    }

    const id = await this.authService.userId(request);
    const hashed = await bcrypt.hash(password, 12);

    await this.userService.update(id, { password: hashed });

    return this.userService.findOneById(id);
  }
  @HasPermission('users')
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.userService.delete(id);
  }
}
