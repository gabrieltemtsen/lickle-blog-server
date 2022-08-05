import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Like } from 'src/likes/models/like.model';

export type PostDocument = Post & Document;

@Schema()
export class Post {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user_id: string;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  image_url: string;

  @Prop()
  cloudinary_id: string;

  @Prop()
  body: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' })
  comments: Comment[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Like' })
  likes: Like[];

  @Prop({ default: Date.now })
  date: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);
