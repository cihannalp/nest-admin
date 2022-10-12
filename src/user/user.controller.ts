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
} from '@nestjs/common';
import { User } from './models/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserUpdateDto } from './models/user-update.dto';

@UseGuards(AuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  async all(@Query('page') page: number = 1): Promise<User[]> {
    return await this.userService.paginate(page);
  }

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

  @Get(':id')
  async get(@Param('id') id: number) {
    return this.userService.findOneById(id);
  }

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

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.userService.delete(id);
  }
}
