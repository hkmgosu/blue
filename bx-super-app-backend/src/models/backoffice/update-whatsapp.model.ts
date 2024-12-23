import { ApiProperty } from '@nestjs/swagger';

export class UpdateWhatsappRequest {
  @ApiProperty({ description: 'Whatsapp Url' })
  url: string;
}
