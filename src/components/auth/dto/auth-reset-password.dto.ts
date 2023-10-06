import { IsJWT, IsStrongPassword } from 'class-validator';

export class AuthResetPasswordDTO{
  @IsJWT() token: string;
  @IsStrongPassword({ minLength: 6,minUppercase: 1 }) password: string;
}