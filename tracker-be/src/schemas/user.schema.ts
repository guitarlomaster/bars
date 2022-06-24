import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";


export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  login: string;

  @Prop({ required: true })
  hash: string;

  @Prop({ required: true })
  salt: string;

  @Prop()
  deleteDate: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
