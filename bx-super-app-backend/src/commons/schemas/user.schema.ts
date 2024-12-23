import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { generateNonce } from '../helpers/generateNonce';

@Schema()
export class UserDoc extends Document {
  @Prop({ required: true, unique: true })
  user_id: string;
  @Prop({ required: true })
  first_name: string;
  @Prop({ required: true })
  last_name: string;
  @Prop({ required: false })
  phone?: string;
  @Prop()
  roles: Array<string>;
  @Prop({ required: true, unique: true })
  email: string;
  @Prop({ required: true, type: [Types.ObjectId], ref: 'Pyme', default: [] })
  pymes?: Types.ObjectId[];
  @Prop({ default: null })
  default_pyme: Types.ObjectId | null;
  @Prop({ required: true, unique: true })
  username: string;
  @Prop({ default: Date.now, type: Date })
  created?: Date;
  @Prop({ required: true, default: false })
  is_email_confirmed: boolean;
  @Prop({ required: true, default: 0 })
  email_confirmation_code: number;
  @Prop({ required: true, default: generateNonce() })
  security_stamp: string;
  @Prop({ default: Date.now, type: Date })
  security_stamp_updated: Date;
  @Prop({ required: false })
  profile_pic: string;
  @Prop({ default: true })
  first_login: boolean;
  @Prop({ default: true })
  first_steps: boolean;
}

export const UserSchema = SchemaFactory.createForClass(UserDoc);
