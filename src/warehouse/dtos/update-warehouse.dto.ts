import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Inventory } from '../models/inventory.model';

export class UpdateWarehouseDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsArray()
  products: ({ id?: string } & Inventory)[];

  @IsOptional()
  @IsString()
  nhaCungCap: string;

  @IsOptional()
  @IsString()
  ngayNhap: Date;

  @IsOptional()
  @IsString()
  GhiChu: string;

  @IsOptional()
  @IsString()
  HinhThucThanhToan: string;

  @IsOptional()
  @IsNumber()
  chietKhau: number;

  @IsOptional()
  @IsNumber()
  thanhToan: number;
}
