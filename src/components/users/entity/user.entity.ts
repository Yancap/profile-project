import { PostsEntity } from 'src/components/posts/entity/posts.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity( { name: "users" })
export class UsersEntity {
  @PrimaryGeneratedColumn() id: number;
  @Column() name: string;
  @Column() email: string;
  @Column() password: string;
  @OneToMany(type => PostsEntity, post => post.user_id) 
  posts: PostsEntity[];
  
}