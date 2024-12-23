import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  ShippingPackageContentType,
  ColaboratorQuantity,
  ShippingQuantity,
} from '../../models/pyme/register-pyme.model';

export enum ConfirmPymeEnum {
  NO_DATA = 'NO_DATA',
  IN_PROCESS = 'IN_PROCESS',
  FAILED = 'FAILED',
  CONFIRMED = 'CONFIRMED',
}

@Schema()
export class Collaborators extends Document {
  @Prop()
  user_id: string;

  @Prop({ enum: ['ACCEPTED', 'REJECTED', 'PENDING'] })
  status: 'ACCEPTED' | 'REJECTED' | 'PENDING';

  @Prop({ default: Date.now, type: Date })
  invitation_date?: Date;

  @Prop({ default: Date.now, type: Date })
  acepted_date?: Date;

  @Prop()
  is_admin: boolean;
}

export class Region {
  @Prop()
  name: string;

  @Prop()
  region_number: string;

  @Prop()
  region_iso_3166: string;

  @Prop()
  country: string;
}

export class BankInformation {
  @Prop()
  client_name: string;
  @Prop()
  rut: string;
  @Prop()
  bank: string;
  @Prop()
  account_type: string;
  @Prop()
  account_number: string;
}

export class Commune {
  @Prop()
  code: string;

  @Prop()
  name: string;

  @Prop()
  region: string;

  @Prop()
  country: string;
  @Prop()
  base_post: string;
}

export class BillingInformation {
  @Prop()
  rut: string;
  @Prop()
  commune?: Commune;
  @Prop()
  address?: string;
  @Prop()
  address_number?: string;
  @Prop()
  address_office?: string;
  @Prop()
  department?: string;
  @Prop()
  postal_code?: string;
  @Prop()
  city_name?: string;
  @Prop()
  region?: Region;
  @Prop()
  legacy_id?: string;
  @Prop()
  client_name?: string;
  @Prop()
  contact_name?: string;
  @Prop()
  phone?: string;
  @Prop()
  email: string;
  @Prop()
  client_type?: string;
  @Prop()
  office?: string;
  @Prop()
  current_account?: string;
}

@Schema()
export class PymeDoc extends Document {
  @Prop({ required: true })
  social_reason: string;

  @Prop()
  email: string;

  @Prop({ required: false, sparse: true, unique: true })
  rut?: string;

  @Prop({ required: true })
  collaborators: Array<Collaborators>;

  @Prop({ default: Date.now, type: Date })
  created: Date;

  @Prop()
  billing_information: BillingInformation;

  @Prop({ default: false })
  has_billing_information: boolean;

  @Prop({ default: false })
  is_natural_person: boolean;

  @Prop({
    default: ConfirmPymeEnum.NO_DATA,
    enum: ['NO_DATA', 'IN_PROCESS', 'FAILED', 'CONFIRMED'],
  })
  has_billing_information_confirmed: ConfirmPymeEnum;

  @Prop()
  shipping_average_weight?: string;

  @Prop()
  shipping_type?: ShippingPackageContentType;

  @Prop()
  collaborator_quantity?: ColaboratorQuantity;

  @Prop()
  shipping_quantity?: ShippingQuantity;

  @Prop()
  other_type?: string;

  @Prop()
  business_clasification?: string;

  @Prop()
  bank_account_information?: BankInformation;

  @Prop({ type: Boolean, default: false })
  created_on_salesforce?: boolean;
}
export const PymeSchema = SchemaFactory.createForClass(PymeDoc);
