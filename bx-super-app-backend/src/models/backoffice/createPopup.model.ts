import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export default class createPopup {
  @ApiProperty({ description: 'title for the popup' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ description: 'description for the popup' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'image for the popup' })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty({ description: 'show flag for the popup' })
  @IsOptional()
  @IsBoolean()
  show?: boolean;

  @ApiProperty({ description: 'Popup type' })
  type?: string;
  @ApiProperty({ description: 'Popup type background' })
  backgroundColor?: string;
  @ApiProperty({ description: 'Popup title setting type' })
  titleColor?: string;
  @ApiProperty({ description: 'Popup text setting type' })
  textColor?: string;
}
