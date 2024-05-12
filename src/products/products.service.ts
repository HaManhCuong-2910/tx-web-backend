import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProductRepository } from './repository/product.repository';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { QuerySearchProductDto } from './dtos/query-search-product.dto';
import { searchFullText } from 'src/common/common';
const { uuid, regex } = require('uuidv4');
@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async createProduct(body: CreateProductDto) {
    try {
      const { maDonHang } = body;
      const res = await this.productRepository.create(body);

      if (res && !maDonHang) {
        console.log('res.id', res.id);
        const index = await this.productRepository.getCurrentIndexInCollection(
          res.id,
        );

        return await this.updateProduct({
          id: res.id,
          maDonHang: `MDH${index}`,
        } as UpdateProductDto);
      }

      return {
        status: HttpStatus.OK,
        data: res,
      };
    } catch (error) {
      throw new HttpException('Không thành công', HttpStatus.BAD_REQUEST);
    }
  }

  async updateProduct(body: UpdateProductDto) {
    const { id, ...updateDtoData } = body;

    const updateDataResponse = await this.productRepository
      .findByIdAndUpdate(id, {
        ...updateDtoData,
      })
      .then((res) => {
        return {
          success: HttpStatus.OK,
          data: res,
        };
      })
      .catch((error) => {
        return {
          success: HttpStatus.BAD_REQUEST,
          data: error,
        };
      });

    return updateDataResponse;
  }

  async getListProduct(query: QuerySearchProductDto) {
    const { page = 1, limit = 10, name, danhMuc, nhaSanXuat } = query;

    const skip = Number(limit) * Number(page) - Number(limit);

    let querySearch = [];

    if (name) {
      querySearch.push({
        name: searchFullText(name),
      });
    }

    if (danhMuc) {
      querySearch.push({
        danhMuc: searchFullText(danhMuc),
      });
    }

    if (nhaSanXuat) {
      querySearch.push({
        nhaSanXuat: searchFullText(nhaSanXuat),
      });
    }

    const countRecord = await this.productRepository.countDocuments(
      querySearch,
    );

    const result = await this.productRepository.getByCondition(
      querySearch.length > 0
        ? {
            $and: querySearch,
          }
        : {},
      undefined,
      { skip, limit, sort: { updatedAt: -1 } },
    );

    return {
      data: result,
      page,
      count: Math.ceil(countRecord / limit),
    };
  }

  async getDetailProduct(id: string) {
    try {
      return await this.productRepository.findById(id);
    } catch (error) {
      throw new HttpException('Không thành công', HttpStatus.NOT_FOUND);
    }
  }

  async deleteProduct(id: string) {
    try {
      await this.productRepository.deleteOne(id);

      return {
        status: HttpStatus.OK,
        message: 'Thành công',
      };
    } catch (error) {
      throw new HttpException('Không thành công', HttpStatus.BAD_REQUEST);
    }
  }
}
