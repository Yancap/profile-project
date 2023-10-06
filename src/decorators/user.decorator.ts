
import { createParamDecorator, ExecutionContext, InternalServerErrorException } from '@nestjs/common';

export const User = createParamDecorator((filter: string | undefined, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();

  if(!request.user) throw new InternalServerErrorException("Auth Guard not found")
  if(filter) request.user = request.user[filter]
  
  return request
  
})

export interface ReqUser{
  email: string;
  userId: number;
}