import { APIConstants } from 'config';
import axiosInstance from 'utils/http-interceptor';
import type {
  AgencyType,
  RegionType,
  CommuneType,
  GeolocationType,
} from 'types/locations';
import type { ErrorResponseType } from 'types/error-response';
import { queryClient } from '../../query-client';

const cachedRegions =
  queryClient.getQueryData<RegionType[]>('locations-regions');
const cachedCommunes =
  queryClient.getQueryData<CommuneType[]>('locations-communes');
const cachedAgencies =
  queryClient.getQueryData<AgencyType[]>('locations-agencies');

export const getRegions = async (): Promise<RegionType[]> => {
  if (cachedRegions) {
    return cachedRegions;
  }
  const { status, data } = await axiosInstance.get<
    RegionType[] | ErrorResponseType
  >(`/${APIConstants.locations}/region`);

  if (status === 200) {
    return data as RegionType[];
  }

  return Promise.reject(new Error((data as ErrorResponseType).payload.error));
};

export const getCommunes = async (): Promise<CommuneType[]> => {
  if (cachedCommunes) {
    return cachedCommunes;
  }
  const { status, data } = await axiosInstance.get<
    CommuneType[] | ErrorResponseType
  >(`/${APIConstants.locations}/commune`);

  if (status === 200) {
    return data as CommuneType[];
  }

  return Promise.reject(new Error((data as ErrorResponseType).payload.error));
};

export const getCommunesByIso = async (
  regionIso: string
): Promise<CommuneType[]> => {
  if (!regionIso) {
    return Promise.reject(new Error('Not provided regionIso'));
  }

  if (cachedCommunes) {
    return cachedCommunes.filter((comm) => comm.region === regionIso);
  }

  const { status, data } = await axiosInstance.get<
    CommuneType[] | ErrorResponseType
  >(`/${APIConstants.locationsV2}/region/${regionIso}/communes`);
  if (status !== 200) {
    return Promise.reject(
      new Error((data as ErrorResponseType).payload?.error)
    );
  }

  return data as CommuneType[];
};

export const getAgencies = async (): Promise<AgencyType[]> => {
  if (cachedAgencies) {
    return cachedAgencies;
  }
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

export const getAgenciesByCommuneCode = async (
  code: string
): Promise<AgencyType[]> => {
  if (!code) {
    return Promise.reject(new Error('Not provided code'));
  }
  if (cachedAgencies) {
    return cachedAgencies.filter((agn) => agn.commune_code === code);
  }

  const { status, data } = await axiosInstance.get<
    AgencyType[] | ErrorResponseType
  >(`/${APIConstants.locations}/commune/${code}/agencies`);

  if (status !== 200) {
    return Promise.reject(
      new Error((data as ErrorResponseType).payload?.error)
    );
  }

  return data as AgencyType[];
};

export async function getCommuneByCoordinate(
  coordinates: GeolocationType
): Promise<CommuneType> {
  if (coordinates.latitude === 0 || coordinates.longitude === 0) {
    return Promise.reject(new Error('Not provided coordinates'));
  }

  const res = await axiosInstance.post<CommuneType | ErrorResponseType>(
    `/${APIConstants.locations}/commune/by-coordinates`,
    { ...coordinates }
  );

  if (res.status === 200) {
    return res.data as CommuneType;
  }

  return Promise.reject(
    new Error((res.data as ErrorResponseType).payload.error)
  );
}

export async function getRegionByIso(region_iso: string): Promise<RegionType> {
  if (!region_iso) {
    return Promise.reject(new Error('Not provided region_iso'));
  }
  const cachedRegionFound = cachedRegions?.find(
    (rgg) => rgg.region_iso_3166 === region_iso
  );
  if (cachedRegions && cachedRegionFound) {
    return cachedRegionFound;
  }

  const { status, data } = await axiosInstance.get<
    RegionType | ErrorResponseType
  >(`/${APIConstants.locations}/region/get-by-iso/${region_iso}`);

  if (status !== 200) {
    return Promise.reject(new Error((data as ErrorResponseType).payload.error));
  }

  return data as RegionType;
}
