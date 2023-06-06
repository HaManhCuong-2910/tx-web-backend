import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class EvaluateUpdateDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsOptional()
  @IsNumber()
  stars: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  image: string;

  @IsOptional()
  @IsString()
  content: string;
}
