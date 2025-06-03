import { Module } from '@nestjs/common';
import { MobileService } from './services/mobile.service';
import { MobileGateway } from './gateways/mobile.gateway';

@Module({
  controllers: [],
  providers: [MobileService, MobileGateway],
})
export class SocketModule {}
