import { AxiosResponse } from 'axios';

import { APIConstants } from 'config';
import axiosInstance from 'utils/http-interceptor';
import type { BillingInfoType, PymeType } from 'types/auth';
import type { ErrorResponseType } from 'types/error-response';
import { PymeBankInformation, PymeBankInformationResponse } from 'types/pyme';

export const getPymeCollaborators = async (
  pymeId: string
): Promise<AxiosResponse<ErrorResponseType>> => {
  return await axiosInstance.get<ErrorResponseType>(
    `/${APIConstants.identity}/pyme/${pymeId}/collaborators`,
    {
      handlerEnabled: false,
    }
  );
};

export const getPymeById = async (id: string): Promise<PymeType> => {
  const { status, data } = await axiosInstance.get<
    PymeType | ErrorResponseType
  >(`/${APIConstants.identity}/pyme/${id}`);

  if (status === 200) {
    return data as PymeType;
  }

  return Promise.reject(new Error((data as ErrorResponseType).payload?.error));
};

export const deletePymeMember = async (id: string): Promise<PymeType> => {
  const { status, data } = await axiosInstance.delete<
    PymeType | ErrorResponseType
  >(`/${APIConstants.identity}/pyme/user/${id}`);
  switch (status) {
    case 200:
    case 204:
      return data as PymeType;
    default:
      return Promise.reject(
        new Error((data as ErrorResponseType).payload?.error)
      );
  }
};

export const putPymeBillingInfo = async (
  id: string,
  billingInfo: any
): Promise<BillingInfoType> => {
  const { status, data } = await axiosInstance.put<
    BillingInfoType | ErrorResponseType
  >(`/${APIConstants.identity}/pyme/${id}/billing`, billingInfo);
  if (status === 200) {
    return data as BillingInfoType;
  }

  return Promise.reject(
    new Error((data as ErrorResponseType).payload?.message)
  );
};

export const putPymeBankInfo = async (
  id: string,
  bankInfo: PymeBankInformation
): Promise<PymeBankInformationResponse> => {
  const { status, data } = await axiosInstance.put<
    PymeBankInformationResponse | ErrorResponseType
  >(`${APIConstants.identity}/pyme/${id}/update-pyme-bank-info`, bankInfo);
  if (status === 200) {
    return data as PymeBankInformationResponse;
  }

  return Promise.reject(
    new Error((data as ErrorResponseType).payload?.message)
  );
};
