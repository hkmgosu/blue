import { APIConstants } from 'config';
import axiosInstance from 'utils/http-interceptor';
import type { PromotionalCodeType } from 'types/promotional-code';
import type { ErrorResponseType } from 'types/error-response';

export enum ShippingTypeEnum {
  NONE = 'NONE',
  UNITARY = 'UNITARY',
  INTERMEDIATE = 'INTERMEDIATE',
  MASSIVE = 'MASSIVE',
}

export type CheckPromotionDataType = {
  promotionalCode: string;
  pymeRut: string;
  shippingType: ShippingTypeEnum;
  codeOrigin: string;
  codeDestiny: string;
  talla: string;
};
export const getPromotionalCode = async (
  checkPromotionalCode: CheckPromotionDataType
): Promise<PromotionalCodeType> => {
  const { status, data } = await axiosInstance.post<
    PromotionalCodeType | ErrorResponseType
  >(
    `/${APIConstants.paymentsV2}/promotion/check/${checkPromotionalCode.promotionalCode}`,
    {
      pymeRut: checkPromotionalCode.pymeRut,
      shippingType: checkPromotionalCode.shippingType,
      codeOrigin: checkPromotionalCode.codeOrigin,
      codeDestiny: checkPromotionalCode.codeDestiny,
      talla: checkPromotionalCode.talla,
    }
  );
  if (status === 200) {
    return data as PromotionalCodeType;
  }

  return Promise.reject(new Error((data as ErrorResponseType).payload.error));
};
