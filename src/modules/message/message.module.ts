import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from 'src/model/message.entity';
import { MessageBatch } from 'src/model/message-batch.entity';
import { MessageStatus } from 'src/model/message-status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MessageBatch, MessageStatus, Message])],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
