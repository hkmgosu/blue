import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
export default class JoiToPymeModel {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  social_reason: string;
}
