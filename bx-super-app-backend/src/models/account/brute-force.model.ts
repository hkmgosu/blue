import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export default class UserIdModel {
  @ApiProperty()
  @IsNotEmpty()
  uid: string;
}
