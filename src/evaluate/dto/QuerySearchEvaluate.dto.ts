import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class QuerySearchEvaluateDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  page: number;

  @IsOptional()
  @IsString()
  limit: number;
}
