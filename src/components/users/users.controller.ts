import { Controller, Get, Post, Param, Body, ParseIntPipe, Res } from '@nestjs/common';
import { RegisterUserDTO } from './dto/Register-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

  constructor(
    private usersService: UsersService
  ){}
  @Get()
  async getAll(): Promise<any> {
    try {
      const user = await this.usersService.getAllUsers()
      return user
    } catch (error) {
      return error
    }
  }
  @Get(":id")
  async getOne(@Param("id", ParseIntPipe) id: number): Promise<any> {
    try {
      const user = await this.usersService.getByUserId(id)
      return user
    } catch (error) {
      return error
    }
  }
  @Post()
  async create(@Body() body: RegisterUserDTO, @Res() response: Response): Promise<any> {
    try {
      const user = await this.usersService.createUser(body)
      return user
    } catch (error) {
      console.log(error);
      if(error instanceof Error) return response.json({message: error.message})
    }
  }
}
