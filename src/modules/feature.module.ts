import { Module } from '@nestjs/common';
import { ProductsModule } from 'src/products/products.module';
import { WarehouseModule } from 'src/warehouse/warehouse.module';
@Module({
  imports: [ProductsModule, WarehouseModule],
  providers: [],
  exports: [ProductsModule, WarehouseModule],
})
export class FeatureModule {}
