import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export type ShippingPackageContentType =
  | 'TECHNOLOGY'
  | 'HOME'
  | 'CLOTHES'
  | 'BEAUTY'
  | 'OFFICE'
  | 'TOYS'
  | 'FOOD'
  | 'DOCUMENTS'
  | 'OTHER';

export type ShippingQuantity =
  | 'BEGINNER'
  | '10_TO_49'
  | '50_TO_100'
  | '101_TO_300'
  | '301_TO_500'
  | '501_TO_1000'
  | '1001_TO_5000'
  | 'MORE_5000';

export type ColaboratorQuantity =
  | '0_TO_10'
  | '11_TO_50'
  | '51_TO_400'
  | '401_TO_1000'
  | 'MORE_1000';

export default class RegisterPymeModel {
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
  @IsNotEmpty()
  @IsString()
  user_id: string;

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
