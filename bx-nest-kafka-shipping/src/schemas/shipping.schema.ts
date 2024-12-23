import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum ShippingStatus {
  CREATED = 'CREATED',
  CONFIRMED = 'CONFIRMED',
  WITH_ERROR = 'WITH_ERROR',
  WITH_CANCEL_REQUEST = 'WITH_CANCEL_REQUEST',
  CANCELED = 'CANCELED',
}

@Schema({
  toJSON: {
    versionKey: false,
  },
})
export class Shipping extends Document {
  @Prop({ type: String, required: true })
  user_id: string;
  @Prop({ type: String, required: true })
  pyme_id: string;
  @Prop({ required: false, unique: true, sparse: true })
  order_service_id?: string;
  @Prop({ default: ShippingStatus.CREATED })
  status: ShippingStatus;
  @Prop({ default: Date.now, type: Date })
  created_at: Date;
  @Prop({ default: Date.now, type: Date })
  updated_at: Date;
  @Prop({ required: false })
  currentAccount?: string;
}

export type ShippingDocument = Shipping;

export const ShippingSchema = SchemaFactory.createForClass(Shipping);
