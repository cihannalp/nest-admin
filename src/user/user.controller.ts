import { 
    Controller, 
    Get, 
    Post,
    Body,
    UseInterceptors,
    ClassSerializerInterceptor,
    UseGuards,
    Param

} from '@nestjs/common';
import { User } from './models/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  async all(): Promise<User[]> {
    return await this.userService.all();
  }

  @Post('create')
  async create(@Body() body): Promise<User> {
    const password = await bcrypt.hash("1234", 12)
    return this.userService.create({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        password
    });
  }

  @Get(':id')
  async get(@Param('id') id: number) {
    return this.userService.findOneById(id);
  }
}
