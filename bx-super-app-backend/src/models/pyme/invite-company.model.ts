import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsArray } from 'class-validator';

export default class InviteCompanyModel {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  pyme_id: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  @IsEmail({}, { each: true })
  email: string[];
}
