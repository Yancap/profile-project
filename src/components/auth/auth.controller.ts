import {
  Body,
  Controller,
  Req,
  Post,
  Put,
  UseGuards,
  Res,
} from '@nestjs/common';
import { AuthLoginDTO } from './dto/auth-login.dto';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { AuthService } from './service/auth.service';
import { AuthForgetPasswordDTO } from './dto/auth-forget-password.dto';
import { AuthResetPasswordDTO } from './dto/auth-reset-password.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { ReqUser, User } from 'src/decorators/user.decorator';
import { DeletePostDTO } from '../posts/dto/delete-posts.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: AuthLoginDTO) {
    const user = await this.authService.login(body);
    return user;
  }
  @Post('register')
  async register(@Body() body: AuthRegisterDTO) {
    const user = await this.authService.register(body);

    return user;
  }
  @Post('forget-password')
  async forgetPassword(@Body() { email }: AuthForgetPasswordDTO) {
    const token = await this.authService.forget(email);
    return { token };
  }

  @UseGuards(AuthGuard)
  @Put('reset-password')
  async resetPassword(
    @User() { body, user }: { body: AuthResetPasswordDTO; user: ReqUser },
  ) {
    return this.authService.reset({userId: user.userId, password: body.password});
  }
}
