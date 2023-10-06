import { IsEmail, IsStrongPassword } from 'class-validator';

export class AuthForgetPasswordDTO{
  @IsEmail() email: string;
}