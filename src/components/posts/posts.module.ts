import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from '../users/entity/user.entity';
import { PostsEntity } from './entity/posts.entity';
import { PostsController } from './controller/posts.controller';
import { PostsService } from './service/posts.service';
import { AuthService } from '../auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([PostsEntity, UsersEntity]), AuthModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
