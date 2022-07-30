import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {Document} from 'mongoose';

export type PostDocument = Post & Document

@Schema()
export class Post{
    @Prop()
    title: string ;

    @Prop()
    description: string ;

    @Prop()
    image: string;

    @Prop()
    body: string;

    @Prop()
    comments: string;

    @Prop()
    likes: number;

    @Prop({default: Date.now})
    date: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post)