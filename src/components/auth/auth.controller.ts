import { Body, Controller, Req, Post, Put, UseGuards } from '@nestjs/common';
import { AuthLoginDTO } from './dto/auth-login.dto';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { AuthService } from './auth.service';
import { AuthForgetPasswordDTO } from './dto/auth-forget-password.dto';
import { AuthResetPasswordDTO } from './dto/auth-reset-password.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from 'src/decorators/user.decorator';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('login')
  async login(@Body() body: AuthLoginDTO){
    const user = await this.authService.login(body);
    return user
  }
  @Post('register')
  async register(@Body() body: AuthRegisterDTO){
    const user = await this.authService.register(body);
    
    return user
  }
  @Post('forget-password')
  async forgetPassword(@Body() {email}: AuthForgetPasswordDTO){
    const user = await this.authService.forget(email);
    return user
  }

  @UseGuards(AuthGuard)
  @Put('reset-password')
  async resetPassword(@User("email") {user}){
    return user
  }


}
