import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoreModule } from 'src/modules/core.module';
import { ordersSchema } from './models/order.model';
import { OrderController } from './orders.controller';
import { OrderService } from './orders.service';
import { OrderRepository } from './repository/order.repository';

@Module({
  imports: [
    CoreModule,
    MongooseModule.forFeature([
      {
        name: 'Order',
        schema: ordersSchema,
      },
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
})
export class OrdersModule {}
