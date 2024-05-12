import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoreModule } from 'src/modules/core.module';
import { warehouseSchema } from './models/warehouse.model';
import { inventorySchema } from './models/inventory.model';
import { WarehouseRepository } from './repository/warehouse.repository';
import { WarehouseService } from './warehouse.service';
import { WarehouseController } from './warehouse.controller';

@Module({
  imports: [
    CoreModule,
    MongooseModule.forFeature([
      {
        name: 'Warehouse',
        schema: warehouseSchema,
      },
      {
        name: 'Inventory',
        schema: inventorySchema,
      },
    ]),
  ],
  controllers: [WarehouseController],
  providers: [WarehouseService, WarehouseRepository],
})
export class WarehouseModule {}
