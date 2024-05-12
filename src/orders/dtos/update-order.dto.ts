import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { IProductInOrder } from '../models/order-product';

export class UpdateOrderDto {
  @IsNotEmpty()
  product: IProductInOrder;

  @IsString()
  nhaCungCap: string;

  @IsString()
  ngayNhap: Date;

  @IsString()
  GhiChu: string;

  @IsString()
  HinhThucThanhToan: string;

  @IsNumber()
  Vat: number;

  @IsNumber()
  chietKhau: number;

  @IsNumber()
  KhachTra: number;
}
