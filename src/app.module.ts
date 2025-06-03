import { Module } from '@nestjs/common';
import { SocketModule } from './socket/socket.module';
import { CommonModule } from './modules/common/common.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SocketModule,
    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
