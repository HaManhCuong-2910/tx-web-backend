import { HttpStatus, Injectable } from '@nestjs/common';
import { MessageRepository } from './repository/message.repository';
import { MessageDto } from './dtos/message.dto';

@Injectable()
export class MessageService {
  constructor(private readonly messageRepository: MessageRepository) {}

  async create(body: MessageDto) {
    try {
      const res = await this.messageRepository.create(body);
      const listMessage = await this.getListMessage(body.username);
      return {
        statusCode: HttpStatus.OK,
        message: res,
        listMessage,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: JSON.stringify(error),
      };
    }
  }

  async delete(body: { id: string }) {
    return await this.messageRepository.deleteOne(body.id);
  }

  async getListMessage(username: string) {
    return (
      (await this.messageRepository.getByCondition({
        username,
      })) || []
    );
  }
}
