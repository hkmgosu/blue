import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export default class VerifyChangePasswordModel {
  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  nonce: string;

  @ApiProperty()
  @IsNotEmpty()
  new_password: string;
}
