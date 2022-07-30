import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {Document} from 'mongoose';
import { userRole } from "../user-role.enum";

export type UserDocument = User & Document

@Schema()
export class User{
    @Prop()
    name: string ;

    @Prop()
    email: string ;

    @Prop()
    password: string;

    @Prop()
    role: userRole;

    // @Prop({default: Date.now})
    // date_added: Date;
}

export const UserSchema = SchemaFactory.createForClass(User)