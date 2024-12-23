import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
export default class FindPymeModel {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  find: string;
}
