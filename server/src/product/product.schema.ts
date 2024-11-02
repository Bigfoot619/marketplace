import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type ProductDocument = Product & Document;

@Schema({ versionKey: false, timestamps: true })
export class Product {
    
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user_id: Types.ObjectId;

    @Prop({ required: true, unique: true })
    title: string

    @Prop()
    description: string

   
    @Prop()
    price: number

    @Prop({ default: Date.now })
    createdAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);