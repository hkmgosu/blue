import { APIConstants, getAccessToken } from 'config';
import axiosInstance from 'utils/http-interceptor';
import type { UserDefaultPymeUpdateResponse, UserType } from 'types/auth';
import type { ErrorResponseType } from 'types/error-response';
import { AxiosResponse } from 'axios';

export const getUserApi = async (): Promise<undefined | UserType> => {
  if (!getAccessToken()) {
    return undefined;
  }
  const { data, status } = await axiosInstance.get<
    UserType | ErrorResponseType
  >(`${APIConstants.identity}/user`);

  if (status === 200) {
    return {
      ...(data as UserType),
      pymes: (data as UserType).pymes?.map((pym) => {
        return {
          ...pym,
          is_natural_person: pym.is_natural_person
            ? pym.is_natural_person
            : false,
        };
      }),
    } as UserType;
  }

  return Promise.reject(new Error((data as ErrorResponseType).payload?.error));
};

type UserUpdateType = {
  firstName?: string;
  lastName?: string;
  phone?: string;
  firstLogin?: boolean;
  firstSteps?: boolean;
};

export const userUpdateApi = async (
  user: UserUpdateType
): Promise<void | unknown> => {
  try {
    const { data, status } = await axiosInstance.put(
      `${APIConstants.identity}/user`,
      user
    );

    if (status === 200) {
      return data;
    }

    return Promise.reject(
      new Error((data as ErrorResponseType).payload?.error)
    );
  } catch (error) {
    return error;
  }
};

export const userUpdateFirstLoginApi = async (
  user: UserUpdateType
): Promise<boolean> => {
  const { data, status } = await axiosInstance.put(
    `${APIConstants.identity}/user/first-login`,
    user
  );

  if (status === 200) {
    return true;
  }

  return Promise.reject(new Error((data as ErrorResponseType).payload?.error));
};

type PasswordChangeType = {
  email: string;
  password: string;
  confirmPassword: string;
};

export const userChangePassword = async (
  payload: PasswordChangeType
): Promise<void | unknown> => {
  try {
    const { email, password, confirmPassword } = payload;

    if (password !== confirmPassword) {
      return Promise.reject(new Error('Contraseñas no coinciden'));
    }

    const { data } = await axiosInstance.put(
      `${APIConstants.identity}/user/change-password`,
      {
        new_password: password,
        username: email,
      }
    );

    return data;

    //return Promise.reject(new Error(data || { error: 'error' }));
  } catch (error) {
    return error;
  }
};

export const userConfirmAccountApi = async (
  payload: any
): Promise<AxiosResponse | unknown> => {
  try {
    const { user, code } = payload;

    const { data, status } = await axiosInstance.get(
      `${APIConstants.identity}/account/confirm-email/${user}/${code}`
    );

    if (status === 200) {
      return data;
    }

    return Promise.reject(
      new Error((data as ErrorResponseType).payload?.error)
    );
  } catch (error) {
    return error;
  }
};

type UserChangeAvatarParamsType = {
  avatar?: string;
  file?: string;
};

export const userChangeAvatar = async ({
  avatar,
  file,
}: UserChangeAvatarParamsType): Promise<void | unknown> => {
  try {
    const { data, status } = await axiosInstance.put(
      `${APIConstants.identity}/user/upload-photo`,
      avatar ? { avatar } : { file }
    );

    if (status !== 200) {
      return Promise.reject(
        new Error((data as ErrorResponseType).payload?.error)
      );
    }
  } catch (error) {
    return error;
  }
};

export const updateUserDefaultPyme = async (
  pyme_id: string
): Promise<UserDefaultPymeUpdateResponse> => {
  if (!pyme_id) {
    return Promise.reject(new Error('El id es requerido'));
  }
  const { data, status } = await axiosInstance.post(
    `${APIConstants.identity}/user/edit-default-pyme`,
    { pyme_id }
  );

  if (status !== 200) {
    return Promise.reject(
      new Error((data as ErrorResponseType).payload?.error)
    );
  }
  return data as UserDefaultPymeUpdateResponse;
};
