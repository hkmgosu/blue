import { ApiProperty } from '@nestjs/swagger';

export class PopupModel {
  @ApiProperty({ description: 'Popup title' })
  title: string;
  @ApiProperty({ description: 'Popup description' })
  description: string;
  @ApiProperty({ description: 'Popup image route' })
  image?: string;
  @ApiProperty({ description: 'Popup show flag' })
  show: boolean;
  @ApiProperty({ description: 'Popup type' })
  type?: string;
  @ApiProperty({ description: 'Popup type backgroung' })
  backgroundColor?: string;
  @ApiProperty({ description: 'Popup title setting type' })
  titleColor?: string;
  @ApiProperty({ description: 'Popup text setting type' })
  textColor?: string;
}
