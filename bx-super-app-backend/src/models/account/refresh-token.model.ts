import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export default class RefreshTokenModel {
  @ApiProperty()
  @IsNotEmpty()
  refresh_token: string;
}
