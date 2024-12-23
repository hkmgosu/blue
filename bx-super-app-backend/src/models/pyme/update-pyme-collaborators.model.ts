import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

class CollaboratorsModel {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}

export default class UpdatePymeCollaboratorsModel {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  rut: string;

  @ApiProperty({ type: [CollaboratorsModel], default: [], isArray: true })
  collaborators: CollaboratorsModel[];
}
