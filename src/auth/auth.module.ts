import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { authSchema } from './models/auth.model';
import { AuthRepository } from './repository/auth.repository';
import { JwtService } from '@nestjs/jwt';
import { CoreModule } from 'src/modules/core.module';
import { MessageModule } from 'src/messages/messages.module';
import { MailService } from 'src/mail/mail.service';

@Module({
  imports: [
    CoreModule,
    MessageModule,
    MongooseModule.forFeature([
      {
        name: 'Auth',
        schema: authSchema,
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, JwtService, MailService],
})
export class AuthModule {}
