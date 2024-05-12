import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateProductDto } from './dtos/create-product.dto';
import { ProductService } from './products.service';
import { UpdateProductDto } from './dtos/update-product.dto';
import { QuerySearchProductDto } from './dtos/query-search-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('/create')
  async createProduct(@Body() body: CreateProductDto) {
    return await this.productService.createProduct(body);
  }

  @Put('/update')
  async updateProduct(@Body() body: UpdateProductDto) {
    return await this.productService.updateProduct(body);
  }

  @Get('/list')
  async getListProduct(@Query() query: QuerySearchProductDto) {
    return await this.productService.getListProduct(query);
  }

  @Get('/:id/detail')
  async getDetailProduct(@Param('id') id: string) {
    return await this.productService.getDetailProduct(id);
  }

  @Delete('/:id/delete')
  async deleteProduct(@Param('id') id: string) {
    return await this.productService.deleteProduct(id);
  }
}
