import { APIConstants } from 'config';
import { ErrorResponseType } from 'types/error-response';
import axiosInstance from 'utils/http-interceptor';

export type popUpType = {
  description: string;
  image?: any;
  show: boolean;
  title: string;
  type?: string;
  backgroundColor?: string;
  titleColor?: string;
  textColor?: string;
  origin?: string;
};

export const getPopupApi = async (): Promise<popUpType> => {
  const { data, status } = await axiosInstance.get<
    popUpType | ErrorResponseType
  >(`/${APIConstants.identity}/popup/origin/points`);

  if (status === 200) {
    return data as popUpType;
  }

  return Promise.reject(new Error((data as ErrorResponseType).payload?.error));
};
