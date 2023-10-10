import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostsEntity } from '../entity/posts.entity';
import { Repository } from 'typeorm';
import { CreatePostHandler, UpdatePostHandler } from './post.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsEntity)
    private postRepository: Repository<PostsEntity>,
  ) {}

  async create(data: CreatePostHandler) {
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

  async update(data: UpdatePostHandler){
    const isThisPostFromUser = await this.postRepository.findOne({
      where: {
        id: data.postId,
        user: {
          id: data.userId
        }
      }
    })

    if(!isThisPostFromUser) throw new NotFoundException('This post not exist or It is not yours')

    const post = await this.postRepository.update({
      id: data.postId,
      user: {
        id: data.userId
      }
    }, {
      photo: data.photo,
      subtitle: data.subtitle,
    });
    return post;
  }

  async getAll(){
    return await this.postRepository.find();
  }
}
