import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document; // By doing this i don't need to explicitly define UserType 

@Schema()
export class User {
    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    firstName: string;

    @Prop({ required: true })
    lastName: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
