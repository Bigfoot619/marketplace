import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ versionKey: false, timestamps: true })
export class User {
  @Prop()
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, default: 0 })
  bank: number;
}

const schema = SchemaFactory.createForClass(User);

schema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'user_id',
});

export const UserSchema = schema;
