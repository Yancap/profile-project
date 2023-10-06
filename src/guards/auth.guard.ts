import { CanActivate, Injectable, ExecutionContext } from '@nestjs/common';
import { AuthService } from 'src/components/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService
  ){ }
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;

    try {
      const data = this.authService.checkToken((authorization ?? '').split(' ')[1])
      request.user = {
        email: data.email,
        userId: Number(data.sub) 
      }
      return true
    } catch (error) {
      return false;
    }
    
  }

}