import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { searchFullText } from 'src/common/common';
import { OrderRepository } from './repository/order.repository';
import { CreateOrderDto } from './dtos/create-order.dto';
@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async createOrder(body: CreateOrderDto) {
    try {
      const res = await this.orderRepository.create(body);

      return {
        status: HttpStatus.OK,
        data: res,
      };
    } catch (error) {
      throw new HttpException('Không thành công', HttpStatus.BAD_REQUEST);
    }
  }
}
