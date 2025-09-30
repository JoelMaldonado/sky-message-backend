import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService) {}

  async signAccessToken(payload: any): Promise<string> {
    return await this.jwtService.signAsync(payload);
  }
}
