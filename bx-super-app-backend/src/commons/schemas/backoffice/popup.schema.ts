import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema({
  toJSON: {
    versionKey: false,
  },
  timestamps: true,
})
export class PopupDoc extends Document {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  description: string;
  @Prop()
  image?: string;
  @Prop({ required: true })
  show: boolean;
  @Prop({ required: true })
  type: string;
  @Prop({ required: true })
  backgroundColor: string;
  @Prop({ required: true })
  titleColor: string;
  @Prop({ required: true })
  textColor: string;
}

export const PopupSchema = SchemaFactory.createForClass(PopupDoc);
