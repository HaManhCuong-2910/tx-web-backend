import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class EvaluateCreateDto {
  @IsNotEmpty()
  @IsNumber()
  stars: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}
