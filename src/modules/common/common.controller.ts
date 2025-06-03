import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CommonService } from './common.service';
import { ContactDto } from './dto/contact.dto';

@Controller('common')
export class CommonController {
  constructor(private readonly service: CommonService) {}

  @HttpCode(HttpStatus.OK)
  @Post('validate-contacts')
  validateContacts(@Body() contacts: ContactDto[]) {
    return this.service.validateContacts(contacts);
  }
}
