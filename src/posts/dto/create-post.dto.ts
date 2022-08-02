export class CreatePostDto {
  title: string;
  description: string;
  image: string;
  body: string;
  comments: [];
  likes: [];
  user_id: string;

}
