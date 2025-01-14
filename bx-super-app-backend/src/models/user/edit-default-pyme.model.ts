import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export default class EditDefaultPymeModel {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  pyme_id: string;
}
