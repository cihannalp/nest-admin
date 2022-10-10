import {
  BadRequestException,
  Body,
  Controller,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './models/register.dto';
import { LoginDto } from './models/login.dto';
@Controller('auth')
export class AuthController {
  constructor(private userService: UserService) {}
  @Post('register')
  async register(@Body() body: RegisterDto) {
    const hashed = await bcrypt.hash(body.password, 12);
    if (body.password !== body.password_confirm) {
      throw new BadRequestException('Password does not match');
    }
    return this.userService.create({
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email,
      password: hashed,
    });
  }
  @Post('login')
  async login(@Body() body: LoginDto) {
    const user = await this.userService.findOne(body.email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (!(await bcrypt.compare(body.password, user.password))) {
      throw new BadRequestException('Invalid credentials');
    }

    return user;
  }
}
