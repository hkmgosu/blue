import User from '../../../models/account/user.model';

export type InfoUserResult = {
  sub: string;
  email_verified: boolean;
  name: string;
  preferred_username: string;
  given_name: string;
  family_name: string;
  email: string;
  roles: Array<string>;
  phone?: string;
  active?: boolean;
  profile_pic?: any;
  first_login?: boolean;
  first_steps?: boolean;
};

export type LoginResult = {
  access_token: string;
  id_token: string;
  expires_in: number;
  refresh_token: string;
};

export type ResetPasswordResult = {
  user_exist: boolean;
  user_id?: string;
  username?: string;
  token?: string;
  nonce?: string;
};

export type ResetPasswordChangeResult = {
  isSuccess: boolean;
  error?: string;
  message?: string;
};

export type CreateUserResult = {
  isSuccess: boolean;
  error: string;
};

export type DefaultResult<T = any> = {
  isSuccess: boolean;
  errorCode?: number;
  error?: any;
  data?: T;
};

export const AUTHENTICATION_SERVICE = 'AUTHENTICATION_SERVICE';

export interface IAuthenticationService {
  AddRole(username: string, role: string): Promise<any>;
  CreateUser(
    name: string,
    lastname: string,
    email: string,
    password: string,
  ): Promise<CreateUserResult>;
  ConfirmEmail(user: User): Promise<CreateUserResult>;
  DeleteUserBruteForce(uid: string): Promise<DefaultResult>;
  FindByUsername(username: string): Promise<DefaultResult<User>>;
  FindByUserId(
    user_id: string,
  ): Promise<{
    isSuccess: boolean;
    user?: User;
    error?: any;
  }>;
  GetUserInfoByAdmin(username: string): Promise<any>;
  GetUserRoles(user_id: string): Promise<any>;
  GetUserBruteForce(user_id: string): Promise<any>;
  Login(
    username: string,
    password: string,
  ): Promise<DefaultResult<LoginResult>>;
  Logout(user_id: string): Promise<boolean>;
  LoginWithAuthorizationCode(
    code: string,
    redirect_uri?: string,
  ): Promise<DefaultResult<LoginResult>>;
  RefreshToken(refreshToken: string): Promise<DefaultResult<LoginResult>>;
  RemoveRole(userId: string, role: string): Promise<any>;
  ResetPassword(username: string): Promise<ResetPasswordResult>;
  ResetPasswordChange(
    user_id: string,
    username: string,
    new_password: string,
  ): Promise<ResetPasswordChangeResult>;
  Update(id: string, user: User): Promise<CreateUserResult>;
  UserInfo(token: string): Promise<DefaultResult<InfoUserResult>>;
}

export interface FakeIAuthenticationService {
  UserInfo(token: string): Promise<DefaultResult<InfoUserResult>>;
  VerifyToken(token: string): Promise<boolean>;
  FindByUserId(
    user_id: string,
  ): Promise<{
    isSuccess: boolean;
    user?: User;
    error?: any;
  }>;
  AddRole(username: string, role: string): Promise<any>;
  FindByUsername(username: string): Promise<DefaultResult<User>>;
}
