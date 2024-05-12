import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoreModule } from 'src/modules/core.module';
import { productSchema } from './models/product.model';
import { ProductController } from './products.controller';
import { ProductService } from './products.service';
import { ProductRepository } from './repository/product.repository';

@Module({
  imports: [
    CoreModule,
    MongooseModule.forFeature([
      {
        name: 'Product',
        schema: productSchema,
      },
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
})
export class ProductsModule {}
