import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/base/base.repository';
import { Product } from '../models/product.model';
import { ObjectID } from 'mongodb';

@Injectable()
export class ProductRepository extends BaseRepository<Product> {
  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<Product>,
  ) {
    super(productModel);
  }

  async countDocuments(filter) {
    return this.productModel.countDocuments(filter);
  }

  async getCurrentIndexInCollection(id: string) {
    const objectID = new ObjectID(id);

    return this.productModel.find({ id: { $lt: objectID } }).count();
  }
}
