import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type LogDocument = Log & Document;

@Schema({ versionKey: false, timestamps: true })
export class Log {
    @Prop({ required: true })
    userId: string;

    @Prop({ required: true })
    action: string;

    @Prop({ default: Date.now })
    timestamp: Date;
}

export const LogSchema = SchemaFactory.createForClass(Log);