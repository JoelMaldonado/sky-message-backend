import { Module } from '@nestjs/common';
import { SocketModule } from './socket/socket.module';
import { CommonModule } from './modules/common/common.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageModule } from './modules/message/message.module';
import { TokenModule } from './modules/token/token.module';
import { WebhookModule } from './modules/webhook/webhook.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT!,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: false,
    }),
    SocketModule,
    CommonModule,
    AuthModule,
    MessageModule,
    TokenModule,
    WebhookModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
