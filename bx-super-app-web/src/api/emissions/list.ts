import { APIConstants } from 'config';
import type { ShippingType } from 'types/emission';
import type { EmissionList } from 'types/emissions';
import type { ErrorResponseType } from 'types/error-response';
import axiosInstance from 'utils/http-interceptor';

export const getEmissionsList = async (): Promise<EmissionList> => {
  const { status, data } = await axiosInstance.get<
    EmissionList | ErrorResponseType
  >(`/${APIConstants.emissions}/emissions/user`);

  if (status === 200) {
    return data as EmissionList;
  }

  return Promise.reject(new Error((data as ErrorResponseType)?.payload?.error));
};

type GetShippingListByUserParamsType = {
  limit: number;
  page: number;
};

export type ShippingWithEmissionTypeWithPagination = {
  meta: {
    currentPage: number;
    itemCount: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
  };
  items: ShippingWithEmissionType[];
};

export type ShippingWithEmissionType = {
  receiver: ShippingType['receiver'];
  currentAccount: string;
  commune: string;
  date: string;
  paymentMethod: string;
  totalValue: number;
  orderServiceId: string;
  shippingFileUrl: string;
  emissionFileUrl: string;
  billingUrl: string;
  pymeName: string;
  macroestado: {
    os_number: string;
    tracking_status: string;
    macrostate: string;
    receiver_name: string;
    destiny_commune: string;
    destiny_region: string;
    creation_date: string;
    price: number;
  }[];
  emission: {
    emissionFileUrl: string;
    billing: {};
  };
};

type getShippingListByUserResponseType = {
  docs: ShippingWithEmissionType[];
  limit: number;
  page: number;
  nextPage: number | null;
  prevPage: number | null;
  totalPage: number;
};

export const getShippingListByUser = async ({
  limit,
  page,
}: GetShippingListByUserParamsType): Promise<getShippingListByUserResponseType> => {
  const { status, data } = await axiosInstance.get<
    getShippingListByUserResponseType | ErrorResponseType
  >(`/${APIConstants.emissions}/emissions/shipping/user/${page}/${limit}`);

  if (status === 200) {
    return data as getShippingListByUserResponseType;
  }

  return Promise.reject(new Error((data as ErrorResponseType)?.payload?.error));
};

type GetShippingListByUserAndDateRangeParamsType = {
  initDate: Date;
  endDate: Date;
  page: number;
  limit: number;
};

export const getShippingListByUserAndDateRange = async ({
  initDate,
  endDate,
  page,
  limit,
}: GetShippingListByUserAndDateRangeParamsType): Promise<ShippingWithEmissionTypeWithPagination> => {
  const { status, data } = await axiosInstance.get<
    ShippingWithEmissionTypeWithPagination | ErrorResponseType
  >(
    `/${
      APIConstants.emissions
    }/emissions/shipping/user/range?initDate=${initDate.toISOString()}&endDate=${endDate.toISOString()}&page=${page}&limit=${limit}`
  );

  if (status === 200) {
    return data as ShippingWithEmissionTypeWithPagination;
  }

  return Promise.reject(new Error((data as ErrorResponseType)?.payload?.error));
};

export interface ShippingWithEmissionTypeWithStatus {
  status: true;
  data: {
    inPreparing: 0;
    retired: 0;
    onWay: 0;
    delivered: 0;
    withProblems: 0;
  };
}

export const getShippingListByUserAndStatus = async ({
  initDate,
  endDate,
}: {
  initDate: Date;
  endDate: Date;
}): Promise<ShippingWithEmissionTypeWithStatus> => {
  const { status, data } = await axiosInstance.get<
    ShippingWithEmissionTypeWithStatus | ErrorResponseType
  >(
    `/${
      APIConstants.emissions
    }/emissions/shipping/user/states?initDate=${initDate.toISOString()}&endDate=${endDate.toISOString()}`
  );

  if (status === 200) {
    return data as ShippingWithEmissionTypeWithStatus;
  }
  return Promise.reject(new Error((data as ErrorResponseType)?.payload?.error));
};
