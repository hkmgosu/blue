import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export default class ResetPasswordModel {
  @ApiProperty()
  @IsNotEmpty()
  username: string;
}
