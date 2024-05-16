import { BaseRepository } from 'src/base/base.repository';
import { Auth } from '../models/auth.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthRepository extends BaseRepository<Auth> {
  constructor(
    @InjectModel('Auth')
    private readonly authModel: Model<Auth>,
    private jwtService: JwtService,
  ) {
    super(authModel);
  }
}
