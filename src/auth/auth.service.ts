import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterAccountDto } from './dtos/register.dto';
import { join } from 'path';
import { AuthRepository } from './repository/auth.repository';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { saltOrRounds } from 'src/common/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private jwtService: JwtService,
  ) {}

  async register(body: RegisterAccountDto) {
    const { username, password } = body;

    const validateExistAccount = await this.authRepository.findByCondition({
      username,
    });

    if (validateExistAccount) {
      throw new HttpException('Tài khoản đã tồn tại', HttpStatus.BAD_REQUEST);
    }

    const hashPassword = await bcrypt.hash(password, saltOrRounds);

    return await this.authRepository
      .create({ username, password: hashPassword })
      .then((newUser) => {
        return {
          statusCode: HttpStatus.OK,
          message: newUser,
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
