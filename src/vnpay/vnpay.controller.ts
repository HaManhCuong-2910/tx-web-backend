import { Body, Controller, Post } from '@nestjs/common';
import { VNPayService } from './vnpay.service';
import { InfoPaymentCard } from 'src/mail/dtos/InfoPaymentCard';
import { InfoPaymentInGame } from 'src/mail/dtos/InfoPaymentInGame';

@Controller('vnpay')
export class VNPayController {
  constructor(private readonly _VNPayService: VNPayService) {}

  @Post('payment')
  async payment(@Body() body: InfoPaymentCard) {
    return await this._VNPayService.payment(body);
  }

  @Post('add-mail-in-game')
  async addMailInGame(@Body() body: InfoPaymentInGame) {
    return await this._VNPayService.addMailInGame(body);
  }
}
