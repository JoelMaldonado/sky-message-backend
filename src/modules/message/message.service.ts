import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageBatch } from 'src/model/message-batch.entity';
import { MessageStatus } from 'src/model/message-status.entity';
import { Message } from 'src/model/message.entity';
import { Repository } from 'typeorm';
import { CreateBatchDto } from './entities/create-batch.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageBatch)
    private readonly messageBatchRepository: Repository<MessageBatch>,

    @InjectRepository(MessageStatus)
    private readonly messageStatusRepository: Repository<MessageStatus>,

    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  async save(dto: CreateBatchDto, userId: number) {
    try {
      if (!dto.messages || dto.messages.length === 0) {
        throw new BadRequestException('Debe incluir al menos un mensaje.');
      }

      const batch = this.messageBatchRepository.create({
        originalTemplate: dto.originalTemplate,
        total: dto.messages.length,
        status: { id: 1 },
        user: { id: userId },
      });

      const savedBatch = await this.messageBatchRepository.save(batch);

      const messages = dto.messages.map((msg) => {
        if (!msg.clientName || !msg.clientPhone) {
          throw new BadRequestException(
            'Cada mensaje debe tener nombre y teléfono.',
          );
        }

        const personalizedMessage = dto.originalTemplate.replace(
          /\[Name\]/gi,
          msg.clientName,
        );

        return this.messageRepository.create({
          clientName: msg.clientName,
          clientPhone: msg.clientPhone,
          finalMessage: personalizedMessage,
          batch: savedBatch,
          status: { id: 1 },
        });
      });

      await this.messageRepository.save(messages);

      return {
        message: 'Lote y mensajes guardados correctamente.',
        batchId: savedBatch.id,
        totalMessages: messages.length,
      };
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof InternalServerErrorException
      ) {
        throw error;
      }

      throw new InternalServerErrorException('Ocurrió un error inesperado.');
    }
  }

  async findAllBatches() {
    const batches = await this.messageBatchRepository.find({
      relations: ['status'],
    });

    const items = batches.map((batch) => ({
      id: batch.id,
      originalTemplate: batch.originalTemplate,
      total: batch.total,
      statusId: batch.status.id,
      status: batch.status.name,
      createdAt: batch.createdAt,
      updatedAt: batch.updatedAt,
    }));

    return items;
  }

  async findAllMessagesByBatchId(batchId: number, statusId?: number) {
    const batch = await this.messageBatchRepository.findOne({
      where: { id: batchId },
    });
    if (!batch) {
      throw new NotFoundException('Lote no encontrado.');
    }
    const items = await this.messageRepository.find({
      relations: ['status'],
      where: { batch: batch, status: statusId ? { id: statusId } : undefined },
    });

    const itemsMapped = items.map((item) => ({
      id: item.id,
      clientName: item.clientName,
      clientPhone: item.clientPhone,
      finalMessage: item.finalMessage,
      statusId: item.status.id,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    }));
    return itemsMapped;
  }
}
