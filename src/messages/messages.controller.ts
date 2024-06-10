import { Body, Controller, Get, Post } from '@nestjs/common';
import { MessageDto } from './dtos/message.dto';
import { MessageService } from './messages.service';

@Controller('message')
export class MessageController {
  constructor(private readonly authService: MessageService) {}

  @Post('create')
  async create(@Body() body: MessageDto) {
    return await this.authService.create(body);
  }

  @Post('delete')
  async delete(@Body() body: { id: string }) {
    return await this.authService.delete(body);
  }
}
