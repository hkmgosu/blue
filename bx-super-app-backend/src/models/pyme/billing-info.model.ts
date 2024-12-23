import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

type Commune = {
  code: string;
  name: string;
  base_post: string;
};

type Region = {
  name: string;
  region_number: string;
  region_iso_3166: string;
};
export default class BillingInformationModel {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  rut: string;

  @ApiProperty()
  @IsNotEmpty()
  commune: Commune;

  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address_number: string;

  @ApiProperty()
  @IsString()
  postal_code: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  city_name: string;

  @ApiProperty()
  @IsNotEmpty()
  region: Region;

  @ApiProperty()
  @IsNotEmpty()
  phone: string;

  @ApiProperty()
  current_account?: string;

  @ApiProperty()
  client_type?: string;

  @ApiProperty()
  office?: string;
}
