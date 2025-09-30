import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    return this.service.login(username, password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    return this.service.register(username, password);
  }
}
