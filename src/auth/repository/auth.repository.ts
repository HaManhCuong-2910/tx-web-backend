import { BaseRepository } from 'src/base/base.repository';
import { Auth } from '../models/auth.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthRepository extends BaseRepository<Auth> {
  constructor(
    @InjectModel('Auth')
    private readonly authModel: Model<Auth>,
    private jwtService: JwtService,
  ) {
    super(authModel);
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.findByCondition({ username });
    if (user) {
      const isMatchPassword = await bcrypt.compare(pass, user.password);

      if (isMatchPassword) {
        delete user.password;
        return user;
      }
      throw new UnauthorizedException(
        'Tài khoản hoặc mật khẩu không chính xác',
      );
    }
    throw new UnauthorizedException('Tài khoản hoặc mật khẩu không chính xác');
  }

  generate_access_token(user) {
    console.log('user', user);
    console.log('process.env.JWT_SECRET', process.env.JWT_SECRET);
    const access_token = this.jwtService.sign(
      { username: user.username },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: '1h',
      },
    );

    return access_token;
  }
}
