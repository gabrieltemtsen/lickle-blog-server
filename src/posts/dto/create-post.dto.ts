import { postCategory } from '../post-category-enum';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {
  user_id: string;
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  category: postCategory;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  image_url: string;
  @IsNotEmpty()
  cloudinary_id: string;
  @IsNotEmpty()
  body: string;
}
