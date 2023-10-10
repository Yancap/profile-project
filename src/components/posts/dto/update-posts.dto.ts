import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdatePostDTO {
  @IsNumber() postId: number;
  @IsOptional() @IsString() photo: string;
  @IsOptional() @IsString() subtitle: string;
}