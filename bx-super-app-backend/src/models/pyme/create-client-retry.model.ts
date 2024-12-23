import { ApiProperty } from '@nestjs/swagger';
import { OperationEnum } from '../../commons/schemas/client-retry.schema';

export default class CreateClientRetryModel {
  @ApiProperty({ required: true })
  pyme_id: string;
  @ApiProperty({ required: true })
  operation: OperationEnum;
}
