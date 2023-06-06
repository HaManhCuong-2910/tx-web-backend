import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/base/base.repository';
import { ObjectId } from 'mongodb';
import { Evaluate } from '../model/evaluate.dto';

@Injectable()
export class EvaluateRepository extends BaseRepository<Evaluate> {
  constructor(
    @InjectModel('Evaluate')
    private readonly evaluateModel: Model<Evaluate>,
  ) {
    super(evaluateModel);
  }

  async countDocuments(filter) {
    return this.evaluateModel.countDocuments(filter);
  }
}
