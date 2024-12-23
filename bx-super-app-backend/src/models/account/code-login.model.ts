import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export default class CodeLoginModel {
  @ApiProperty()
  @IsNotEmpty()
  code: string;
  redirect_uri: string;
}
