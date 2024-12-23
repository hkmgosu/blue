import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class PymeData extends Document {
  @Prop({ required: true })
  key: string;

  @Prop({ required: true })
  value: string;
}

@Schema()
export class PymeActivities extends Document {
  @Prop({ required: true })
  giro: string;

  @Prop({ required: true })
  code: number;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  affects_iva: boolean;
}

@Schema()
export class PymeDocuments extends Document {
  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  year: number;
}

@Schema()
export class ValidatePymeDoc extends Document {
  @Prop({ required: true })
  pyme_rut: string;

  @Prop({ required: true })
  rut: string;

  @Prop({ required: true })
  social_reason: string;

  @Prop({ required: true })
  data: PymeData[];

  @Prop({ required: true })
  activities: PymeActivities[];

  @Prop({ required: true })
  documents: PymeDocuments[];

  @Prop({ required: true, default: new Date() })
  created?: Date;
}

export const ValidatePymeSchema = SchemaFactory.createForClass(ValidatePymeDoc);
