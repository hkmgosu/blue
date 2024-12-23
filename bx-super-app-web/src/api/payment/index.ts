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
  PaymentResponseType,
  ReceiverPaymentRequestType,
  GenericPaymentRequestType,
} from 'types/payment';
import type { ErrorResponseType } from 'types/error-response';
import { hashObject } from 'utils/sign-hash';

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

export const getPaymentCards = async (): Promise<
  AxiosResponse<CardType[] | ErrorResponseType>
> => {
  return await axiosInstance.get<CardType[] | ErrorResponseType>(
    `/${APIConstants.payments}/oneclick/payment-cards`,
    {
      handlerEnabled: false,
    }
  );
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
  const hashReq = {
    s_: hashVerify<AuthorizeTransactionType>(request),
    ...request,
  };
  return await axiosInstance.post(
    `/${APIConstants.payments}/oneclick/authorize-transaction/${id}`,
    hashReq,
    {
      handlerEnabled: false,
    }
  );
};

export const initBancoestadoTransaction = async (
  request: GenericPaymentRequestType
): Promise<AxiosResponse> => {
  return await axiosInstance.post(
    `/${APIConstants.payments}/bancoestado/init-transaction`,
    request,
    {
      handlerEnabled: false,
    }
  );
};

export const initWebpayTransaction = async (
  request: WebpayPaymentRequestType
): Promise<AxiosResponse> => {
  const hashReq = {
    s_: hashVerify<WebpayPaymentRequestType>(request),
    ...request,
  };
  return await axiosInstance.post(
    `/${APIConstants.payments}/webpay/init-transaction`,
    hashReq,
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

export const createReceiverPay = async (
  request: ReceiverPaymentRequestType
): Promise<AxiosResponse> => {
  const hashReq = {
    s_: hashVerify<ReceiverPaymentRequestType>(request),
    ...request,
  };
  return await axiosInstance.post(
    `${APIConstants.payments}/receiver-pay`,
    hashReq
  );
};

export const createFreePay = async (
  request: ReceiverPaymentRequestType
): Promise<AxiosResponse> => {
  const hashReq = {
    s_: hashVerify<ReceiverPaymentRequestType>(request),
    ...request,
  };
  return await axiosInstance.post(`${APIConstants.payments}/free-pay`, hashReq);
};

export const getPayment = async (
  transactionId: string
): Promise<PaymentResponseType | undefined> => {
  if (!transactionId) {
    return undefined;
  }
  const res = await axiosInstance.get<PaymentResponseType | ErrorResponseType>(
    `${APIConstants.payments}/payment/get-payment/${transactionId}`
  );

  if (res.status !== 200) {
    return Promise.reject(
      new Error((res.data as ErrorResponseType).payload?.error)
    );
  }

  return res.data as PaymentResponseType;
};

function hashVerify<T>(data: T): string {
  const keys = Object.keys(data);

  const hashData = keys.reduce((acum, value) => {
    return `${acum}+${data[value as keyof T]}`;
  }, '');

  return hashObject(hashData);
}
