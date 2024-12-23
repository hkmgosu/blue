import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum AnswerInvitationPymeEnum {
  OK = 'OK',
  NOK = 'NOK',
}

export class AnswerInvitationPymeModel {
  @IsNotEmpty()
  @IsString()
  invitation_id: string;
  @IsNotEmpty()
  @IsString()
  @IsEnum(AnswerInvitationPymeEnum)
  answer: AnswerInvitationPymeEnum;
}
