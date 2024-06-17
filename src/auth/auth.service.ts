import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterAccountDto } from './dtos/register.dto';
import { join } from 'path';
import { AuthRepository } from './repository/auth.repository';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { saltOrRounds } from 'src/common/common';
import { MessageService } from 'src/messages/messages.service';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private jwtService: JwtService,
    private readonly messageService: MessageService,
    private readonly mailService: MailService,
  ) {}

  async login(body: RegisterAccountDto) {
    const { username, password } = body;
    const resultLogin = await this.authRepository.validateUser(
      username,
      password,
    );
    if (resultLogin) {
      const access_token =
        this.authRepository.generate_access_token(resultLogin);
      const listMessage = await this.messageService.getListMessage(
        resultLogin.username,
      );
      return {
        statusCode: HttpStatus.OK,
        message: {
          username: resultLogin.username,
          access_token,
          listMessage,
        },
      };
    }
    throw new UnauthorizedException('Tài khoản hoặc mật khẩu không chính xác');
  }

  async register(body: RegisterAccountDto) {
    const { username, password } = body;

    const validateExistAccount = await this.authRepository.findByCondition({
      username,
    });

    if (validateExistAccount) {
      throw new HttpException('Tài khoản đã tồn tại', HttpStatus.BAD_REQUEST);
    }

    const hashPassword = await bcrypt.hash(password, saltOrRounds);

    await this.mailService.sendInfoLoginAccount({
      username,
      password,
    });

    return await this.authRepository
      .create({ username, password: hashPassword })
      .then(async (newUser) => {
        const dataMessage = await this.messageService.create({
          username: newUser.username,
          title: 'Chào mừng quý khách',
          message: `Chào mừng quý khách đến với cổng giải trí trực tuyến hot nhất hiện nay. 
Quý khách có thể trải nghiệm hàng loạt trò chơi vô cùng hấp dẫn, đăng ký dễ dàng, giao dịch nhanh chóng qua nhiều công giao dịch rất tiện lợi.
Tỷ lệ quy đổi 1-1 không mất phí.
Hệ thống nạp tiền đa dạng qua ngân hàng, crypto và thẻ cào.
Hỗ trợ khách hàng 24/7 tất cả các ngày.
Chúc quý khách luôn vui vẻ và gặp nhiều may mắn.`,
        });

        return {
          statusCode: HttpStatus.OK,
          message: newUser,
          listMessage: dataMessage.listMessage || [],
        };
      })
      .catch((error) => {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: error,
        };
      });
  }
}
