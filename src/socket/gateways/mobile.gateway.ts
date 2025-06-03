import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { MobileService } from '../services/mobile.service';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MobileGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly service: MobileService) {}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    const phones = this.service.getAvailablePhones();
    client.emit('cellphone.sync', phones);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);

    this.service.removeBySocketId(client.id);
    const phones = this.service.getAvailablePhones();
    this.server.emit('cellphone.sync', phones);
  }

  @SubscribeMessage('available')
  handleAvailable(
    @MessageBody() data: { id: string },
    @ConnectedSocket() client: Socket,
  ) {
    this.service.registerAvailable(data.id, client.id);
    this.server.emit('cellphone.connected', { id: data.id });
    const phones = this.service.getAvailablePhones();
    this.server.emit('cellphone.sync', phones);
  }
}
