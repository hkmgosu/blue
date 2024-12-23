import { APIConstants } from 'config';
import axiosInstance from 'utils/http-interceptor';
import type { CalculatePricingType, PriceType } from 'types/emissions';
import type { ErrorResponseType } from 'types/error-response';
import type { PricingDtoType, PricingReturnType } from 'types/pricing';

export const getPrice = async (
  priceData: CalculatePricingType
): Promise<PriceType> => {
  const { status, data } = await axiosInstance.post<
    PriceType | ErrorResponseType
  >(`/${APIConstants.appraisals}/pricing/calculate`, priceData);

  if (status === 200) {
    return data as PriceType;
  }

  return Promise.reject(new Error((data as ErrorResponseType).payload.error));
};

export async function getNewPricing(
  pricingDto: PricingDtoType
): Promise<PricingReturnType | null> {
  if (!pricingDto.codeOrigin) return null;
  if (!pricingDto.codeDestination) return null;

  const res = await axiosInstance.post<PricingReturnType>(
    `/${APIConstants.pricing}/price`,
    pricingDto
  );

  return res.data as PricingReturnType;
}
