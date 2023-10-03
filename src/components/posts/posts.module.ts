import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from '../users/entity/user.entity';
import { PostsEntity } from './entity/posts.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostsEntity])
  ]
})
export class PostsModule {}
