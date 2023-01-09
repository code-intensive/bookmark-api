import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class SignInDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}

export class SignUpDto extends SignInDto {
  @IsOptional()
  firstName: string;

  @IsOptional()
  lastName: string;
}

export class UserInDBDto {
  @IsNumber()
  id: number;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export interface AccessTokenDto {
  access_token: string;
}
