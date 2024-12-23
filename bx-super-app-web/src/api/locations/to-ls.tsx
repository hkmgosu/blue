import { APIConstants } from 'config';
import axiosInstance from 'utils/http-interceptor';
import type { AgencyType, RegionType, CommuneType } from 'types/locations';
import type { ErrorResponseType } from 'types/error-response';

export const getRegionsCache = async (): Promise<RegionType[]> => {
  const { status, data } = await axiosInstance.get<
    RegionType[] | ErrorResponseType
  >(`/${APIConstants.locations}/region`);

  if (status === 200) {
    return data as RegionType[];
  }

  return Promise.reject(new Error((data as ErrorResponseType).payload.error));
};

export const getCommunesCache = async (): Promise<CommuneType[]> => {
  const { status, data } = await axiosInstance.get<
    CommuneType[] | ErrorResponseType
  >(`/${APIConstants.locations}/commune`);

  if (status !== 200) {
    return Promise.reject(
      new Error((data as ErrorResponseType).payload?.error)
    );
  }

  return data as CommuneType[];
};

export const getAgenciesCache = async (): Promise<AgencyType[]> => {
  const { status, data } = await axiosInstance.get<
    AgencyType[] | ErrorResponseType
  >(`/${APIConstants.locations}/agency`);

  if (status !== 200) {
    return Promise.reject(
      new Error((data as ErrorResponseType).payload?.error)
    );
  }

  return data as AgencyType[];
};
