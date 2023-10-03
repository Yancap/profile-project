import { Controller, Get, Param, Body, Post } from '@nestjs/common';
import { CreatePostDTO } from './dto/create-posts.dto';

@Controller('posts')
export class PostsController {
  @Get()
  async getAll(): Promise<any> {
    return
  }
  @Get(":id")
  async getOne(@Param("id") id: string): Promise<any> {
    return id
  }
  @Get("users/:user_id")
  async getToUser(@Param("user_id") user_id: string): Promise<any> {
    return user_id
  }
  @Post()
  async create(@Body() body: CreatePostDTO): Promise<any> {
    return body
  }
  
}
