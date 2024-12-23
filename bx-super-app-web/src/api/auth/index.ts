import axios, { AxiosResponse } from 'axios';

import * as configApp from 'config/';
import axiosInstance from 'utils/http-interceptor';
import type {
  LoginRequest,
  LoginResponse,
  LoginResponseOk,
  RefreshTokenResponse,
  UnionLoginResponse,
  LoginResponseNok,
  LoginResponseReject,
  SocialLoginResponseDataType,
} from 'types/auth';
import { APIConstants } from 'config';
import type { ErrorResponseType } from 'types/error-response';

export const handleLoginResponse = (data: LoginResponseOk): void => {
  configApp.setAccessToken(data.access_token);
  configApp.setRefreshToken(data.refresh_token);
};

export const handleSocialLoginResponse = (
  data: SocialLoginResponseDataType
): void => {
  configApp.setAccessToken(data.access_token);
  configApp.setRefreshToken(data.refresh_token);
};

export const deleteSession = async (
  user_id: string
): Promise<AxiosResponse> => {
  return await axiosInstance.post(
    `${configApp.APIConstants.identity}/account/logout`,
    { user_id: user_id }
  );
};

export const logout = (): void => {
  configApp.cleanTokens();
  configApp.cleanLocationsStorage();
};

export async function authLogout(): Promise<boolean> {
  const response = await axios.post(
    `${configApp.keycloakUrl}/auth/realms/super-app/protocol/openid-connect/logout`,
    new URLSearchParams({
      client_id: configApp.keycloakClient,
      refresh_token: configApp.getRefreshToken(),
      client_secret: configApp.keycloakClientSecret,
    })
  );
  if (response.status === 204) {
    return true;
  } else {
    return false;
  }
}

export const login = async (form: LoginRequest): Promise<LoginResponse> => {
  configApp.cleanLocationsStorage();
  const { status, data } = await axiosInstance.post<UnionLoginResponse>(
    `${configApp.APIConstants.identity}/account/login`,
    form
  );

  if (status === 200) {
    handleLoginResponse(data as LoginResponseOk);
    return { type: 'success', data: data as LoginResponseOk };
  } else if (status === 401) {
    return { type: 'incorrect', data: data as LoginResponseNok };
  } else if (status === 400) {
    return { type: 'invalid', data: data as LoginResponseReject };
  } else if (status === 406) {
    return { type: 'notConfirmed', data: data as LoginResponseReject };
  }

  return { type: 'unknown', data };
};

export async function refreshToken(
  refresh_token: string
): Promise<AxiosResponse> {
  return await axiosInstance.post<RefreshTokenResponse>(
    `${configApp.APIConstants.identity}/account/refresh-token`,
    { refresh_token },
    { handlerEnabled: false }
  );
}

export const codeLogin = async (
  code: string,
  redirect?: string
): Promise<SocialLoginResponseDataType> => {
  const queryString = new URLSearchParams({
    code: code,
    redirect_uri: redirect || '',
  }).toString();
  const result = await axiosInstance.post<
    SocialLoginResponseDataType | ErrorResponseType
  >(`${APIConstants.identity}/account/code-login`, queryString, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });

  if (result.status === 200) {
    handleSocialLoginResponse(result.data as SocialLoginResponseDataType);
    return result.data as SocialLoginResponseDataType;
  }

  return Promise.reject(new Error((result.data as ErrorResponseType).payload));
};
