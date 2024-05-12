import { IProductInWareHouse } from './models/warehouse-product';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { WarehouseRepository } from './repository/warehouse.repository';
import { CreateWarehouseDto } from './dtos/create-warehouse.dto';
import { UpdateWarehouseDto } from './dtos/update-warehouse.dto';

@Injectable()
export class WarehouseService {
  constructor(private readonly warehouseRepository: WarehouseRepository) {}

  async createWarehouse(body: CreateWarehouseDto) {
    try {
      const { products, ...filterBody } = body;
      const inventories = await this.warehouseRepository.insertInventory(
        products,
      );

      const productsCustom = inventories.map((item) => {
        return {
          id: item._id,
          count: item.countNumber,
        };
      });

      const res = await this.warehouseRepository.create({
        products: productsCustom,
        ...filterBody,
      });

      return {
        status: HttpStatus.OK,
        data: res,
      };
    } catch (error) {
      throw new HttpException('Không thành công', HttpStatus.BAD_REQUEST);
    }
  }

  async updateWarehouse(body: UpdateWarehouseDto) {
    try {
      const { id, ...updateDtoData } = body;
      const item = await this.warehouseRepository.findById(body.id);
      const newProducts = [];
      const dataInsertInventory = [];
      for (let index = 0; index < body.products.length; index++) {
        const newItem = body.products[index];
        const oldItem = item.products.find(
          (itemFind) => itemFind.id.toString() === newItem.id,
        );

        if (oldItem) {
          const countNumber = newItem.countNumber - oldItem.count;

          this.warehouseRepository.updateInventory(oldItem.id, {
            countNumber,
            giaVon: newItem.giaVon,
          });

          newProducts.push({
            id: newItem.id,
            count: newItem.countNumber,
          });
        } else {
          dataInsertInventory.push(newItem);
        }
      }

      if (dataInsertInventory.length > 0) {
        const inventories = await this.warehouseRepository.insertInventory(
          dataInsertInventory,
        );

        const productsCustom = inventories.map((item) => {
          return {
            id: item._id,
            count: item.countNumber,
          };
        });

        newProducts.concat(productsCustom);
      }

      const updateDataResponse = await this.warehouseRepository
        .findByIdAndUpdate(body.id, {
          ...updateDtoData,
          products: newProducts,
        })
        .then((res) => {
          return {
            success: HttpStatus.OK,
            data: res,
          };
        })
        .catch((error) => {
          console.log('error', error);
          return {
            success: HttpStatus.BAD_REQUEST,
            data: error,
          };
        });

      return {
        status: HttpStatus.OK,
        data: updateDataResponse,
      };
    } catch (error) {
      console.log('error 1', error);
      return {
        success: HttpStatus.BAD_REQUEST,
        data: error,
      };
    }
  }

  async getListWarehouse() {
    const page = 1,
      limit = 10;
    const skip = Number(limit) * Number(page) - Number(limit);

    const countRecord = await this.warehouseRepository.countDocuments([]);

    const result = await this.warehouseRepository.getByCondition(
      {},
      undefined,
      { skip, limit, sort: { updatedAt: -1 } },
      [
        {
          path: 'products.id',
          model: 'Inventory',
        },
      ],
    );

    return {
      data: result,
      page,
      count: Math.ceil(countRecord / limit),
    };
  }

  async getListInventory() {
    const page = 1,
      limit = 10;
    const skip = Number(limit) * Number(page) - Number(limit);

    const countRecord = await this.warehouseRepository.countDocuments([]);

    const result = await this.warehouseRepository.getListInventory(
      {},
      undefined,
      { skip, limit, sort: { updatedAt: -1 } },
    );

    return {
      data: result,
      page,
      count: Math.ceil(countRecord / limit),
    };
  }
}
