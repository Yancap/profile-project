import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreatePostDTO {
  @IsString() photo: string;
  @IsString() subtitle: string;
}