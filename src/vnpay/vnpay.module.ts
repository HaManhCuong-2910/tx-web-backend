import { Module } from '@nestjs/common';
import { CoreModule } from 'src/modules/core.module';
import { VNPayController } from './vnpay.controller';
import { VNPayService } from './vnpay.service';
import { MailService } from 'src/mail/mail.service';

@Module({
  imports: [CoreModule],
  controllers: [VNPayController],
  providers: [VNPayService, MailService],
  exports: [VNPayService],
})
export class VNPayModule {}
