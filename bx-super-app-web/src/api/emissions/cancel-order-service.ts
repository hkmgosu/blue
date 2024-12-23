import { APIConstants } from 'config';
import axiosInstance from 'utils/http-interceptor';
import type { ErrorResponseType } from 'types/error-response';
import { CancelOsRequest } from 'types/emission';

export const cancelOrderServiceAPI = async (
  order_service: string,
  payload: CancelOsRequest,
  currentAccount: string,
  userRut: string
): Promise<string> => {
  const { status, data } = await axiosInstance.put<ErrorResponseType>(
    `${APIConstants.emissions}/emissions/cancel-order-service/${order_service}`,
    {
      reason: payload.reason,
      otherReason: payload.otherReason,
      bankInformation: payload.bankInformation,
      currentAccount: currentAccount,
      userRut: userRut,
    }
  );

  if (status === 200) {
    return 'OK';
  }
  return data.payload.message;
};
