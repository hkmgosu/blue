import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export default class GetUserModel {
  @ApiProperty()
  @IsNotEmpty()
  username: string;
}
