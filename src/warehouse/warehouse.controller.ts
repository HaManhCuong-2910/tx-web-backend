import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { CreateWarehouseDto } from './dtos/create-warehouse.dto';
import { UpdateWarehouseDto } from './dtos/update-warehouse.dto';

@Controller('warehouse')
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

  @Post('/create')
  async createWarehouse(@Body() body: CreateWarehouseDto) {
    return await this.warehouseService.createWarehouse(body);
  }

  @Put('/update')
  async updateWarehouse(@Body() body: UpdateWarehouseDto) {
    return await this.warehouseService.updateWarehouse(body);
  }

  @Get('/list')
  async getListWarehouse() {
    return await this.warehouseService.getListWarehouse();
  }

  @Get('/list-inventory')
  async getListInventory() {
    return await this.warehouseService.getListInventory();
  }
}
