import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export default class PymeRutModel {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  rut: string;
}
