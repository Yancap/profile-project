import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostsEntity } from '../entity/posts.entity';
import { Repository } from 'typeorm';
import { CreatePostDTO } from '../dto/create-posts.dto';
import { CreatePostHandler } from './post.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsEntity)
    private postRepository: Repository<PostsEntity>,
  ) {}

  async create(data: CreatePostHandler) {
    console.log(data);

    const post = await this.postRepository.save({
      photo: data.photo,
      subtitle: data.subtitle,
      likes: 0,
      user: {
        id: data.userId
      }
    });
    return post;
  }
}
