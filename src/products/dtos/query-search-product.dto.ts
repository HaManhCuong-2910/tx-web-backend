import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class QuerySearchProductDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  danhMuc: string;

  @IsOptional()
  @IsString()
  nhaSanXuat: string;

  @IsOptional()
  @IsString()
  page: number;

  @IsOptional()
  @IsString()
  limit: number;
}
