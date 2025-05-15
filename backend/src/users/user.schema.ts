import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 'user' })
  role: 'user' | 'admin';

  @Prop({ default: "not_active" })
  isVerified: "not_active" | "active" | "in_registration";

  @Prop({ type: String, default: null })
  verifyToken: string | null;
}

export const UserSchema = SchemaFactory.createForClass(User);
