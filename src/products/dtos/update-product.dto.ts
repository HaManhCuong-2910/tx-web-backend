import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateProductDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  maDonHang: string;

  @IsOptional()
  @IsNumber()
  countNumber: number;

  @IsOptional()
  @IsString()
  Unit: string;

  @IsOptional()
  @IsBoolean()
  isSuaGiaKhiBan: boolean;

  @IsOptional()
  @IsBoolean()
  isChoBanAm: boolean;

  @IsOptional()
  @IsNumber()
  giaVon: number;

  @IsOptional()
  @IsString()
  thongTinThem: number;

  @IsOptional()
  @IsString()
  linkNhap: number;

  @IsOptional()
  @IsNumber()
  giaLe: number;

  @IsOptional()
  @IsNumber()
  giaSi: number;

  @IsOptional()
  @IsNumber()
  baoHanh: number;

  @IsOptional()
  @IsString()
  danhMuc: string;

  @IsOptional()
  @IsString()
  nhaSanXuat: string;

  @IsOptional()
  @IsNumber()
  dinhMucToiThieu: number;

  @IsOptional()
  @IsNumber()
  dinhMucToiDa: number;

  @IsOptional()
  @IsString()
  image: string;
}
