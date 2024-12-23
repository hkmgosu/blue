import { APIConstants } from 'config';
import axiosInstance from 'utils/http-interceptor';
import type { EmissionType } from 'types/emissions';
import type {
  EmissionType as NewEmissionType,
  ResumeEmissionType,
} from 'types/emission';
import type { ErrorResponseType } from 'types/error-response';
import { EmissionByTransactionIdType } from 'hooks/use-get-emission-by-transaction-id';

export const getEmission = async (id: string): Promise<EmissionType | null> => {
  const { status, data } = await axiosInstance.get<EmissionType>(
    `/${APIConstants.emissions}/emissions/${id}`
  );

  if (status === 200) {
    return data;
  }

  return null;
};

export async function getEmissionById(
  emissionId: string
): Promise<NewEmissionType | undefined> {
  if (!emissionId) {
    return undefined;
  }

  const res = await axiosInstance.get<NewEmissionType | ErrorResponseType>(
    `/${APIConstants.emissions}/emissions/${emissionId}`
  );

  if (res.status !== 200) {
    return Promise.reject(
      new Error((res.data as ErrorResponseType).payload?.error)
    );
  }

  return res.data as NewEmissionType;
}

export async function getEmissionByTransactionId(
  transactionId: string
): Promise<EmissionByTransactionIdType | undefined> {
  if (!transactionId) {
    return undefined;
  }

  const res = await axiosInstance.get<
    EmissionByTransactionIdType | ErrorResponseType
  >(`/${APIConstants.emissions}/emissions/tid/${transactionId}`);

  if (res.status !== 200) {
    return Promise.reject(
      new Error((res.data as ErrorResponseType).payload?.error)
    );
  }

  return res.data as EmissionByTransactionIdType;
}

export async function getResumeEmissionById(
  emissionId: string
): Promise<ResumeEmissionType | undefined> {
  if (!emissionId) return undefined;
  const res = await axiosInstance.get<ResumeEmissionType | ErrorResponseType>(
    `/${APIConstants.emissions}/emissions/resume/${emissionId}`
  );

  if (res.status !== 200) {
    return Promise.reject(
      new Error((res.data as ErrorResponseType).payload?.error)
    );
  }

  return res.data as ResumeEmissionType;
}
