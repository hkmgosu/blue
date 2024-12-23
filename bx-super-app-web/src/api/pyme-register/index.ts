import { APIConstants } from 'config';
import axiosInstance from 'utils/http-interceptor';
import type {
  PymeRegisterRequestType,
  PymeRegisterResponseType,
  JoinToPymeRequestType,
  JoinToPymeResponseType,
  PymeUpdateRequestType,
  PymeUpdateResponeType,
} from 'types/pyme';
import type { ErrorResponseType } from 'types/error-response';

export const pymeRegisterApi = async (
  request: PymeRegisterRequestType
): Promise<PymeRegisterResponseType> => {
  const { status, data } = await axiosInstance.post<
    PymeRegisterResponseType | ErrorResponseType
  >(`${APIConstants.identity}/pyme/register`, {
    ...request,
  });

  if (status === 201 || status === 200) {
    return data as PymeRegisterResponseType;
  }
  if (status >= 400) {
    return data as PymeRegisterResponseType;
  }

  return Promise.reject(new Error((data as ErrorResponseType).payload?.error));
};

export const pymeUpdatePyme = async (
  id: string,
  request: PymeUpdateRequestType
): Promise<PymeUpdateResponeType> => {
  const { status, data } = await axiosInstance.put<
    PymeUpdateResponeType | ErrorResponseType
  >(`${APIConstants.identity}/pyme/${id}`, {
    ...request,
  });

  if (status === 200) {
    return data as PymeUpdateResponeType;
  }
  return Promise.reject(new Error((data as ErrorResponseType).payload?.error));
};

export const joinToPymeApi = async (
  request: JoinToPymeRequestType
): Promise<JoinToPymeResponseType> => {
  const { status, data } = await axiosInstance.post<
    JoinToPymeResponseType | ErrorResponseType
  >(`${APIConstants.identity}/pyme/join`, {
    ...request,
  });

  if (status === 200) {
    return data as JoinToPymeResponseType;
  }
  if (status >= 400) {
    return data as PymeRegisterResponseType;
  }
  return (data as ErrorResponseType).payload?.error;
};
