import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Inventory } from '../models/inventory.model';

export class CreateWarehouseDto {
  @IsNotEmpty()
  @IsArray()
  products: Inventory[];

  @IsString()
  nhaCungCap: string;

  @IsString()
  ngayNhap: Date;

  @IsString()
  GhiChu: string;

  @IsString()
  HinhThucThanhToan: string;

  @IsNumber()
  chietKhau: number;

  @IsNumber()
  thanhToan: number;
}
