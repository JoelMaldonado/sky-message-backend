import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/model/user.entity';
import { TokenModule } from '../token/token.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TokenModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
