import { BaseRepository } from 'src/base/base.repository';
import { Messages } from '../models/message.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MessageRepository extends BaseRepository<Messages> {
  constructor(
    @InjectModel('Message')
    private readonly messageModel: Model<Messages>,
  ) {
    super(messageModel);
  }
}
