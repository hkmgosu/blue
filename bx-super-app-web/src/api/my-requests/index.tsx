import { APIConstants } from 'config';
import axiosInstance from 'utils/http-interceptor';
import type { ErrorResponseType } from 'types/error-response';

export type RRType = {
  pymeId: string;
  pyme_name: string;
  _id: string;
  invitationType: 'COLLABORATOR' | 'ADMIN';
  email: string;
  status: string;
};

export type GetRequestsReceivedResType = {
  message: string;
  invitations: RRType[];
};

export async function getRequestsReceived(
  userEmail: string
): Promise<GetRequestsReceivedResType> {
  const { status, data } = await axiosInstance.get<
    GetRequestsReceivedResType | ErrorResponseType
  >(
    `/${APIConstants.identity}/pyme/invitations-by-email-and-status/${userEmail}/PENDING`
  );

  if (status === 200) {
    return data as GetRequestsReceivedResType;
  }

  return Promise.reject(new Error((data as ErrorResponseType).payload.error));
}

export async function getRequestsSent(): Promise<GetRequestsReceivedResType> {
  const { status, data } = await axiosInstance.get<
    GetRequestsReceivedResType | ErrorResponseType
  >(`/${APIConstants.identity}/pyme/invitations-by-pyme/PENDING`);

  if (status === 200) {
    return data as GetRequestsReceivedResType;
  }

  return Promise.reject(new Error((data as ErrorResponseType).payload.error));
}
