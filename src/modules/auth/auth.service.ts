import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/model/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly tokenService: TokenService,
  ) {}

  async login(username: string, password: string) {
    const user = await this.userRepository.findOne({
      where: { username },
    });

    if (!user) {
      throw new NotFoundException('Invalid username');
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = {
      id: user.id,
      username: user.username,
    };

    const accessToken = await this.tokenService.signAccessToken(payload);

    return {
      access_token: accessToken,
    };
  }

  async register(username: string, password: string) {
    const existingUser = await this.userRepository.findOne({
      where: { username },
    });

    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      username,
      passwordHash: passwordHash,
    });

    await this.userRepository.save(user);
  }
}
