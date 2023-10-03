import { UsersEntity } from 'src/components/users/entity/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity( { name: "posts" })
export class PostsEntity {
  @PrimaryGeneratedColumn() id: number;
  @Column() photo: string;
  @Column() subtitle: string;
  @Column({ default: 0}) likes: number;
  @ManyToOne(() => UsersEntity, users => users.id)
  user_id: number
}