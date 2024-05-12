import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/base/base.repository';
import { Warehouse } from '../models/warehouse.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Inventory } from '../models/inventory.model';

@Injectable()
export class WarehouseRepository extends BaseRepository<Warehouse> {
  constructor(
    @InjectModel('Warehouse')
    private readonly warehouseModel: Model<Warehouse>,
    @InjectModel('Inventory')
    private readonly inventoryModel: Model<Inventory>,
  ) {
    super(warehouseModel);
  }

  async countDocuments(filter) {
    return this.warehouseModel.countDocuments(filter);
  }

  async insertInventory(data: Inventory[]) {
    const result = [];
    for (let index = 0; index < data.length; index++) {
      const item = data[index];
      const inventoryData = await this.inventoryModel.findOneAndUpdate(
        { maDonHang: item.maDonHang },
        {
          maDonHang: item.maDonHang,
          name: item.name,
          giaLe: item.giaLe,
          giaVon: item.giaVon,
          countNumber: item.countNumber,
        },
        {
          new: true,
          upsert: true,
        },
      );

      result.push(inventoryData);
    }

    return result;
  }

  async updateInventory(
    id: string,
    dataUpdate: { countNumber?: number; giaVon?: number },
  ) {
    if (dataUpdate.countNumber) {
      await this.inventoryModel.findByIdAndUpdate(
        id,
        {
          $inc: {
            countNumber: dataUpdate.countNumber,
          },
        },
        {
          new: true,
        },
      );
    }

    return await this.inventoryModel.findByIdAndUpdate(
      id,
      {
        giaVon: dataUpdate.giaVon,
      },
      {
        new: true,
      },
    );
  }

  async getListInventory(
    filter,
    field?: any | null,
    option?: any | null,
    populate?: any | null,
  ) {
    return this.inventoryModel.find(filter, field, option).populate(populate);
  }
}
