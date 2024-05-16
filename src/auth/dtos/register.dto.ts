import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterAccountDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
