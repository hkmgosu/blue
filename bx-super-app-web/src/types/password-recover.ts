export type PasswordRecoverResponseType = {
  statusCode?: number;
  timestamp?: string;
  path?: string;
  payload?: any;
  user_exist?: boolean;
  user_id?: string;
  username?: string;
  token?: string;
  nonce?: string;
};

export type ChangePasswordResponseType = {
  isSuccess: boolean;
  error?: string;
  message?: string;
  statusCode?: number;
  timestamp?: string;
  path?: string;
  payload?: any;
};

export type ChangePasswordRequestType = {
  username: string;
  nonce: string;
  new_password: string;
};
