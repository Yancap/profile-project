import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  ParseIntPipe,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';
import { UserCreateDTO } from './dto/user-create.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getAll(): Promise<any> {
    try {
      const user = await this.usersService.getAllUsers();
      return user;
    } catch (error) {
      return error;
    }
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number): Promise<any> {
    try {
      const user = await this.usersService.getByUserId(id);
      return user;
    } catch (error) {
      return error;
    }
  }

  @Post()
  async create( @Body() body: UserCreateDTO, @Res() response: Response, ): Promise<any> {
    try {
      const user = await this.usersService.createUser(body);
      return user;
    } catch (error) {
      if (error instanceof Error)
        return response.json({ message: error.message });
    }
  }
  
}
