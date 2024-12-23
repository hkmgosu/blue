import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum InvitationStatus {
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
  ACCEPTED = 'ACCEPTED',
}

export enum InvitationType {
  ADMIN = 'ADMIN',
  COLLABORATOR = 'COLLABORATOR',
}

@Schema()
export class CompanyInvitation extends Document {
  @Prop({ required: true })
  pyme_id: string;
  @Prop({ required: true })
  pyme_name: string;
  @Prop({ required: true })
  email: string;
  @Prop({ required: true, enum: ['PENDING', 'REJECTED', 'ACCEPTED'] })
  status: InvitationStatus;
  @Prop({
    required: true,
    enum: ['ADMIN', 'COLLABORATOR'],
    default: InvitationType.COLLABORATOR,
  })
  invitationType: InvitationType;
}

export const CompanyInvitationSchema = SchemaFactory.createForClass(
  CompanyInvitation,
);
