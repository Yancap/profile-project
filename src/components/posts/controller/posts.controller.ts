import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CreatePostDTO } from '../dto/create-posts.dto';
import { PostsService } from '../service/posts.service';
import { Response } from 'express';
import { AuthGuard } from 'src/guards/auth.guard';
import { ReqUser, User } from 'src/decorators/user.decorator';

@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  @Get()
  async getAll(): Promise<any> {
    return [];
  }
  @Get(':id')
  async getOne(@Param('id') id: string): Promise<any> {
    return id;
  }
  @Get('users/:user_id')
  async getToUser(@Param('user_id') user_id: string): Promise<any> {
    return user_id;
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @User() { body, user }: { body: CreatePostDTO; user: ReqUser },
    @Res() response: Response,
  ): Promise<any> {
    try {
      const post = await this.postService.create({ ...body, userId: user.userId });
      return post;
    } catch (err) {
      if (err instanceof Error) return response.json({ message: err.message });
    }
  }
}
