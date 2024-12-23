import { APIConstants } from 'config';
import axiosInstance from 'utils/http-interceptor';
import { ErrorResponseType } from 'types/error-response';
import { ShippingEmissionDtoType } from 'types/shipping';

export const retryEmission = async (
  emissionId: string
): Promise<ShippingEmissionDtoType> => {
  const { status, data } = await axiosInstance.get<
    ShippingEmissionDtoType | ErrorResponseType
  >(`/${APIConstants.emissions}/emissions/retry/${emissionId}`);

  if (status !== 200) {
    return Promise.reject(
      new Error((data as ErrorResponseType).payload?.error)
    );
  }

  return data as ShippingEmissionDtoType;
};
