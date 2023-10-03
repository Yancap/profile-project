import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './entity/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PostsEntity } from '../posts/entity/posts.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity, PostsEntity])
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
