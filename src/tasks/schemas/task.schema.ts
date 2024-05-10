import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema({ timestamps: true }) // Automatically adds createdAt and updatedAt fields
export class Task {

    @Prop({ required: true, enum: ['Development', 'Test', 'Document'] })
    type: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    startTime: Date;

    @Prop({ required: true })
    finishTime: Date;

    @Prop({ enum: ['processing', 'done', 'canceled'], default: 'processing' }) // Define enum for status
    status: string;

}

export const TaskSchema = SchemaFactory.createForClass(Task);
