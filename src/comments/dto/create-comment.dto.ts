import { IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  user_id: string;
  @IsNotEmpty()
  post_id: string;
  @IsNotEmpty()
  comment: string;
}
