import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user.entity';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  exports: [UserService, TypeOrmModule],
  imports: [TypeOrmModule.forFeature([User]),
  JwtModule.register({
    secret: 'secret',
    signOptions: { expiresIn: '1d' },
  }),],
  controllers: [UserController],
  providers: [UserService],
})

export class UserModule {}
