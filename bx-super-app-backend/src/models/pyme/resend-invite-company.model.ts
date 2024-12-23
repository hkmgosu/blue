import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEnum } from 'class-validator';

export enum InvitationTypeEnum {
  MEMBER = 'MEMBER',
  ADMIN = 'ADMIN',
}

export default class ResendInviteCompanyModel {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  invitation_id: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEnum(InvitationTypeEnum)
  invitationType: InvitationTypeEnum;
}
