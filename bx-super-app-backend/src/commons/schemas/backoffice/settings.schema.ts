import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export class WhatsappType {
  @Prop()
  url?: string;
}

@Schema({
  toJSON: {
    versionKey: false,
  },
  timestamps: true,
})
export class SettingsDoc extends Document {
  @Prop({ required: false })
  whatsapp_info?: WhatsappType;
}

export const SettingsSchema = SchemaFactory.createForClass(SettingsDoc);
