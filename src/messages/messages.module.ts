import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoreModule } from 'src/modules/core.module';
import { messageSchema } from './models/message.model';
import { MessageController } from './messages.controller';
import { MessageService } from './messages.service';
import { MessageRepository } from './repository/message.repository';

@Module({
  imports: [
    CoreModule,
    MongooseModule.forFeature([
      {
        name: 'Message',
        schema: messageSchema,
      },
    ]),
  ],
  controllers: [MessageController],
  providers: [MessageService, MessageRepository],
  exports: [MessageService, MessageRepository],
})
export class MessageModule {}
