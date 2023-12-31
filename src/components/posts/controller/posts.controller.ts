import {
  Controller,
  Get,
  Param,
  Delete,
  Post,
  Res,
  UseGuards,
  Put,
  HttpException,
} from '@nestjs/common';
import { CreatePostDTO } from '../dto/create-posts.dto';
import { PostsService } from '../service/posts.service';
import { Response } from 'express';
import { AuthGuard } from 'src/guards/auth.guard';
import { ReqUser, User } from 'src/decorators/user.decorator';
import { UpdatePostDTO } from '../dto/update-posts.dto';
import { DeletePostDTO } from '../dto/delete-posts.dto';

@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  @Get()
  async getAll(): Promise<any> {
    return await this.postService.getAll();
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
  ){
    try {
      const post = await this.postService.create({ ...body, userId: user.userId });
      return response.json(post);
    } catch (err) {
      if (err instanceof HttpException) return response.status(err.getStatus()).json(err.getResponse());
    }
  }

  @UseGuards(AuthGuard)
  @Put()
  async update(
    @User() { body, user }: { body: UpdatePostDTO; user: ReqUser },
    @Res() response: Response,
  ){
    try {
      await this.postService.update({ ...body, userId: user.userId });
      return response.json({message: "success"})
    } catch (err) {
      if (err instanceof HttpException) return response.status(err.getStatus()).json(err.getResponse());
    }

  }

  @UseGuards(AuthGuard)
  @Delete()
  async delete(
    @User() { body, user }: { body: DeletePostDTO; user: ReqUser },
    @Res() response: Response,
  ){
    try {
      const result = await this.postService.delete({postId: Number(body.postId), userId: user.userId})

      if(result) return response.json({message: "success"})
      return response.status(205).json({message: "not deleted"});

    } catch (err) {
      if (err instanceof HttpException) return response.status(err.getStatus()).json(err.getResponse());
    }

  }

}
