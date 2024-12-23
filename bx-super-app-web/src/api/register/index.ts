import { AxiosResponse } from 'axios';

import { APIConstants } from 'config';
import axiosInstance from 'utils/http-interceptor';
import type { ErrorResponseType } from 'types/error-response';

export type registerType = {
  name: string;
  lastname: string;
  email: string;
  password: string;
  avatar?: string;
  file?: string;
};

export const registerAPI = async (
  request: registerType
): Promise<AxiosResponse<ErrorResponseType>> => {
  return await axiosInstance.post<ErrorResponseType>(
    `/${APIConstants.identity}/account/register`,
    request,
    {
      handlerEnabled: false,
    }
  );
};
