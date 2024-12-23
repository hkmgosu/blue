import { ApiProperty } from '@nestjs/swagger';

export default class PymeBankInformation {
  @ApiProperty({ description: ' client name ' })
  client_name: string;
  @ApiProperty({ description: 'client rut ' })
  rut: string;
  @ApiProperty({ description: 'bank name ' })
  bank: string;
  @ApiProperty({ description: 'acount type ' })
  account_type: string;
  @ApiProperty({ description: 'bank account number ' })
  account_number: string;
}