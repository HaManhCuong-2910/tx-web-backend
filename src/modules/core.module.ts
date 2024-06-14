import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MailModule,
    MongooseModule.forRoot(process.env.DATABASE_URL),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        secure: true,
        port: 465,
        auth: {
          user: process.env.MAIL_SERVICE_USER,
          pass: process.env.MAIL_SERVICE_PASS,
        },
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/public/',
    }),
    ScheduleModule.forRoot(),
  ],
  providers: [],
  exports: [
    ConfigModule,
    MongooseModule,
    JwtModule,
    MailerModule,
    ServeStaticModule,
    ScheduleModule,
  ],
})
export class CoreModule {}
