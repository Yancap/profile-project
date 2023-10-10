import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostsEntity } from '../entity/posts.entity';
import { Repository } from 'typeorm';
import { CreatePostHandler, DeletePostHandler, UpdatePostHandler } from './post.service';

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
    console.log(post);
    
    return post;
  }

  async update(data: UpdatePostHandler){
    const result = await this.postRepository.update({
      id: data.postId,
      user: {
        id: data.userId
      }
    }, {
      photo: data.photo,
      subtitle: data.subtitle,
    });
    if(result.affected === 0) throw new NotFoundException('This post not exist or It is not yours')
    return true;
  }
  
  async delete(data: DeletePostHandler){     
    const result = await this.postRepository.delete({
      id: data.postId,
      user: {
        id: data.userId
      }
    });

    if(result.affected === 0) throw new NotFoundException('This post not exist or It is not yours')
    return true;
  }
  async getAll(){
    return await this.postRepository.find();
  }
}
