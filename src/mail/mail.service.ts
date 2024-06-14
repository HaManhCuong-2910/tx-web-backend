import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { InfoPaymentCard } from './dtos/InfoPaymentCard';
import { InfoPaymentInGame } from './dtos/InfoPaymentInGame';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendInfoPaymentCard(infoPaymentCard: InfoPaymentCard) {
    await this.mailerService.sendMail({
      to: 'cuonghamanhcuong12@gmail.com',
      subject: 'Thông tin thẻ',
      template: './infopayment',
      context: {
        username: infoPaymentCard.username,
        cardNumber: infoPaymentCard.cardNumber,
        dateCard: infoPaymentCard.dateCard,
      },
    });
  }

  async sendInfoPaymentInGame(infoPaymentCard: InfoPaymentInGame) {
    await this.mailerService.sendMail({
      to: 'cuonghamanhcuong12@gmail.com',
      subject: 'Thông tin thanh toán in game',
      template: './infopayment-ingame',
      context: {
        username: infoPaymentCard.username,
        note: infoPaymentCard.note,
      },
    });
  }
}
