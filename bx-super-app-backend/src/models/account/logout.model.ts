import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export default class LogoutModel {
  @ApiProperty()
  @IsNotEmpty()
  user_id: string;
}
