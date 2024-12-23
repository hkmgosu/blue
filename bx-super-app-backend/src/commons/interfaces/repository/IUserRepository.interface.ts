import { Types } from 'mongoose';
import { ICrudRepository } from './ICrudRepository.interface';
import { UserDoc } from '../../schemas/user.schema';
import { PymeDoc } from '../../schemas/pyme.schema';

export const USER_REPOSITORY = 'USER_REPOSITORY';

export interface IUserRepository extends ICrudRepository<UserDoc> {
  AcceptPymeInvitation(user_id: string, pyme_id: string): Promise<UserDoc>;
  CreateUser(
    user_id: string,
    email: string,
    first_name: string,
    last_name: string,
    roles?: Array<string>,
    profile_pic?: string,
  ): Promise<UserDoc>;
  ConfirmEmail(username: string): Promise<boolean>;
  DeleteResetPassword(username: string): Promise<void>;
  FindByUserId(user_id: string): Promise<UserDoc>;
  FindPymesByUserId(user_id: string): Promise<PymeDoc[]>;
  //Update(user_id: string, doc: UserDoc): Promise<UserDoc>;
  FindNotConfirmedUser(): Promise<UserDoc[]>;
  GenerateEmailConfirmCode(userId: string, username: string): Promise<string>;
  GenerateResetPasswordCode(
    user_id: string,
    username: string,
    nonce: string,
  ): Promise<string>;
  HasDefaultPyme(user_id: string): Promise<boolean>;
  IsConfirmEmailCode(username: string, code: number): Promise<boolean>;
  RemovePymeFromUser(user_id: string, pyme_id: string): Promise<UserDoc>;
  VerifyResetPasswordCode(username: string, nonce: string): Promise<UserDoc>;
  AddDefaultPyme(user_id: string, pyme_id: Types.ObjectId): Promise<UserDoc>;
  AddRole(user_id: string, roles: string[] | string): Promise<UserDoc>;
  RemoveRole(user_id: string, roles: string[] | string): Promise<UserDoc>;
}
