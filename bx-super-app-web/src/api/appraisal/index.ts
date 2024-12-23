import { APIConstants } from 'config';
import { AxiosResponse } from 'axios';
import axiosInstance from 'utils/http-interceptor';
import type { ErrorResponseType } from 'types/error-response';

export type cotizationType = {
  EMAILS: Array<string>;
  PYME: string;
  PRICE: string;
  DATE: string;
  ORIGIN: string;
  DESTINY: string;
  SIZE: string;
  WEIGHT: number;
  HOURS: number;
  DAYS: number;
  HEIGHT: string;
  LENGTH: string;
  WIDTH: string;
};

export const cotizationMail = async (
  request: cotizationType
): Promise<AxiosResponse<ErrorResponseType>> => {
  return await axiosInstance.post<ErrorResponseType>(
    `/${APIConstants.appraisals}/share/cotization`,
    request,
    {
      handlerEnabled: false,
      timeout: 150000,
    }
  );
};
