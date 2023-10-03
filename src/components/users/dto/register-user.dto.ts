import { IsString, IsEmail,IsStrongPassword, IsOptional } from 'class-validator';

export class RegisterUserDTO {
  @IsString() name: string;
  @IsEmail() email: string;
  @IsStrongPassword({ minLength: 6,minUppercase: 1 }) password: string;
  @IsOptional() @IsString() avatar: string;
}