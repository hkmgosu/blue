import { APIConstants } from 'config';
import axiosInstance from 'utils/http-interceptor';
import type { OsType } from 'types/tracking';
import type { ErrorResponseType } from 'types/error-response';

export const getOrderService = async (os: string): Promise<OsType> => {
  if (!os) {
    return Promise.reject(new Error('OS not found.'));
  }
  const { status, data } = await axiosInstance.get<OsType | ErrorResponseType>(
    `/${APIConstants.emissions}/emissions/status/order-service/${os}`
  );

  if (status !== 200) {
    return Promise.reject(
      new Error((data as ErrorResponseType).payload?.message)
    );
  }
  return data as OsType;
};
