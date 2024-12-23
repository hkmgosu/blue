import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export default class ResetPasswordVerifyModel {
  @ApiProperty()
  @IsNotEmpty()
  nonce: string;

  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  new_password: string;
}
