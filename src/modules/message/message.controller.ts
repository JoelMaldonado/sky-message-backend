import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateBatchDto } from './entities/create-batch.dto';

@Controller('message')
export class MessageController {
  constructor(private readonly service: MessageService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  async save(@Body() dto: CreateBatchDto) {
    return this.service.save(dto, 1);
  }

  @Get('batches')
  async findAllBatches() {
    return this.service.findAllBatches();
  }

  @Get('batches/:batchId/messages')
  async findAllMessagesByBatchId(
    @Param('batchId') batchId: number,
    @Query('statusId') statusId?: number,
  ) {
    return this.service.findAllMessagesByBatchId(batchId, statusId);
  }
}
