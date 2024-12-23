import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export default class InviteCompanyAdminModel {
  @IsNotEmpty()
  @IsString()
  pyme_id: string;
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;
}
