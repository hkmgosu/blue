import { ApiProperty } from '@nestjs/swagger';

export default class UserFirstLogin {
  @ApiProperty()
  firstLogin?: boolean;
  firstSteps?: boolean;
}
