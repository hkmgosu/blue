import { AxiosResponse } from 'axios';

import { APIConstants } from 'config';
import axiosInstance from 'utils/http-interceptor';
import type {
  AuthorizeTransactionType,
  InitInscriptionResponseType,
  InitInscriptionRequestType,
  ConfirmInscriptionResponseType,
  CardType,
  WebpayPaymentRequestType,
  CommitTransactionResponseType,
  ConfirmInscriptionRequestType,
} from 'types/payment';
import type { ErrorResponseType } from 'types/error-response';

export const initInscription = async (
  request: InitInscriptionRequestType
): Promise<AxiosResponse<InitInscriptionResponseType | ErrorResponseType>> => {
  return await axiosInstance.post<
    InitInscriptionResponseType | ErrorResponseType
  >(`/${APIConstants.payments}/oneclick/init-inscription`, request, {
    handlerEnabled: false,
  });
};

export const confirmInscription = async (
  token: string
): Promise<
  AxiosResponse<ConfirmInscriptionResponseType | ErrorResponseType>
> => {
  return await axiosInstance.get<
    ConfirmInscriptionResponseType | ErrorResponseType
  >(`/${APIConstants.payments}/oneclick/confirm-inscription/${token}`, {
    handlerEnabled: false,
  });
};

export const getPaymentCards = async (): Promise<CardType[]> => {
  const { status, data } = await axiosInstance.get<
    CardType[] | ErrorResponseType
  >(`/${APIConstants.payments}/oneclick/payment-cards`, {
    handlerEnabled: false,
  });

  if (status === 200) {
    return data as CardType[];
  }

  return Promise.reject(new Error((data as ErrorResponseType).payload.error));
};

export const removeInscription = async (id: string): Promise<AxiosResponse> => {
  return await axiosInstance.delete(
    `/${APIConstants.payments}/oneclick/remove-inscription/${id}`,
    {
      handlerEnabled: false,
    }
  );
};

export const authorizeTransaction = async (
  id: string,
  request: AuthorizeTransactionType
): Promise<AxiosResponse> => {
  return await axiosInstance.post(
    `/${APIConstants.payments}/oneclick/authorize-transaction/${id}`,
    request,
    {
      handlerEnabled: false,
    }
  );
};

export const initWebpayTransaction = async (
  request: WebpayPaymentRequestType
): Promise<AxiosResponse> => {
  return await axiosInstance.post(
    `/${APIConstants.payments}/webpay/init-transaction`,
    request,
    {
      handlerEnabled: false,
    }
  );
};

export const confirmWebpayTransaction = async (
  request: ConfirmInscriptionRequestType
): Promise<
  AxiosResponse<CommitTransactionResponseType | ErrorResponseType>
> => {
  return await axiosInstance.post<
    CommitTransactionResponseType | ErrorResponseType
  >(`/${APIConstants.payments}/webpay/confirm-transaction/`, request, {
    handlerEnabled: false,
  });
};

export const getWebpayTransaction = async (
  token: string
): Promise<
  AxiosResponse<CommitTransactionResponseType | ErrorResponseType>
> => {
  return await axiosInstance.get<
    CommitTransactionResponseType | ErrorResponseType
  >(`/${APIConstants.payments}/webpay/get-transaction/${token}`, {
    handlerEnabled: false,
  });
};
