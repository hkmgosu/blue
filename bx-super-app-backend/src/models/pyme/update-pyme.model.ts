import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import {
  ColaboratorQuantity,
  ShippingPackageContentType,
  ShippingQuantity,
} from './register-pyme.model';

export default class UpdatePymeModel {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  social_reason: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  rut: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  is_natural_person?: boolean;

  @IsOptional()
  @IsString()
  shipping_average_weight?: string;

  @ApiProperty()
  @IsOptional()
  shipping_type?: ShippingPackageContentType;

  @ApiProperty()
  @IsOptional()
  collaborator_quantity?: ColaboratorQuantity;

  @ApiProperty()
  @IsOptional()
  shipping_quantity?: ShippingQuantity;

  @ApiProperty()
  @IsOptional()
  @IsString()
  other_type?: string;
}
