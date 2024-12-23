import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum OperationEnum {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
}

@Schema()
export class ClientRetryDoc extends Document {
  @Prop({ required: true })
  pyme_id: string;
  @Prop({ enum: ['CREATE', 'UPDATE'] })
  operation: OperationEnum;
  @Prop({ default: Date.now, type: Date })
  created: Date;
}

export const ClientRetrySchema = SchemaFactory.createForClass(ClientRetryDoc);
