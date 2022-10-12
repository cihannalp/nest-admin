import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user.entity';
import { UserService } from './user.service';
import { CommonModule } from 'src/common/common.module';

@Module({
  exports: [UserService, TypeOrmModule],
  imports: [TypeOrmModule.forFeature([User]), CommonModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
