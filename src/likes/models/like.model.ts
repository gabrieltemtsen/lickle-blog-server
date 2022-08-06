import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type LikeDocument = Like & Document;

@Schema()
export class Like {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user_id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post' })
  post_id: string;
}

export const LikeSchema = SchemaFactory.createForClass(Like);
