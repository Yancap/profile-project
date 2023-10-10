import { IsString } from 'class-validator';

export class DeletePostDTO {
  @IsString() postId: string;
}