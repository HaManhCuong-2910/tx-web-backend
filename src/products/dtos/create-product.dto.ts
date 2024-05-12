import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  maDonHang: string;

  @IsNumber()
  countNumber: number;

  @IsString()
  Unit: string;

  @IsBoolean()
  isSuaGiaKhiBan: boolean;

  @IsBoolean()
  isChoBanAm: boolean;

  @IsNumber()
  giaVon: number;

  @IsString()
  thongTinThem: number;

  @IsString()
  linkNhap: number;

  @IsNumber()
  giaLe: number;

  @IsNumber()
  giaSi: number;

  @IsNumber()
  baoHanh: number;

  @IsString()
  danhMuc: string;

  @IsString()
  nhaSanXuat: string;

  @IsNumber()
  dinhMucToiThieu: number;

  @IsNumber()
  dinhMucToiDa: number;

  @IsString()
  image: string;
}
