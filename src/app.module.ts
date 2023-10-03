import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './components/users/users.controller';
import { UsersService } from './components/users/users.service';
import { UsersModule } from './components/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UsersEntity } from './components/users/entity/user.entity';
import { PostsEntity } from './components/posts/entity/posts.entity';
import { PostsController } from './components/posts/posts.controller';
import { PostsService } from './components/posts/posts.service';
import { PostsModule } from './components/posts/posts.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: "localhost",
      port: 3306,
      username: "yan123",
      password: 'yan123',
      database: 'learnNest',
      entities: [UsersEntity, PostsEntity],
    }),
    PostsModule
  ],
  controllers: [AppController, PostsController],
  providers: [AppService, PostsService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
