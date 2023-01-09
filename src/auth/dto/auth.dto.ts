import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

const MIN_LENGTH = 4;

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
  @IsString()
  @MinLength(MIN_LENGTH)
  firstName: string;

  @IsOptional()
  @IsString()
  @MinLength(MIN_LENGTH)
  lastName: string;
}

export class UserInDBDto {
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  @MinLength(MIN_LENGTH)
  firstName: string;

  @IsOptional()
  @IsString()
  @MinLength(MIN_LENGTH)
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export interface AccessTokenDto {
  access_token: string;
}
