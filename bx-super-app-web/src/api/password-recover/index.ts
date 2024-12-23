import { APIConstants } from 'config';
import axiosInstance from 'utils/http-interceptor';
import type {
  PasswordRecoverResponseType,
  ChangePasswordResponseType,
  ChangePasswordRequestType,
} from 'types/password-recover';
import type { ErrorResponseType } from 'types/error-response';

export const generateResetPasswordCodeApi = async (
  request: string
): Promise<PasswordRecoverResponseType> => {
  const { data, status } = await axiosInstance.post<
    PasswordRecoverResponseType | ErrorResponseType
  >(
    `/${APIConstants.identity}/account/reset-password/generate-code`,
    { username: request },
    { handlerEnabled: false }
  );

  if (status === 200) {
    return data as PasswordRecoverResponseType;
  }

  return data as ErrorResponseType;
};

export const changePasswordApi = async (
  request: ChangePasswordRequestType
): Promise<ChangePasswordResponseType> => {
  const { status, data } = await axiosInstance.post<
    ChangePasswordResponseType | ErrorResponseType
  >(
    `/${APIConstants.identity}/account/reset-password/change-password`,
    { ...request },
    { handlerEnabled: false }
  );

  if (status === 200) {
    return data as ChangePasswordResponseType;
  }

  return data as ChangePasswordResponseType;
};
