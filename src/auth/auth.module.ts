import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [UserModule, CommonModule],
  controllers: [AuthController],
})
export class AuthModule {}
