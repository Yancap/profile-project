import { IsString } from 'class-validator';

export class DeletePostDTO {
  @IsString() post_id: string;
}