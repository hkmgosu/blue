import { APIConstants } from 'config';
import axiosInstance from 'utils/http-interceptor';
import type { ErrorResponseType } from 'types/error-response';
import type { FrequentOriginResponseType } from 'types/frequent-origin';

export async function getFrequentOriginByPymeId(
  pyme_id: string
): Promise<FrequentOriginResponseType> {
  if (!pyme_id) {
    return Promise.reject(new Error('Not provided pyme_id'));
  }

  const { status, data } = await axiosInstance.get<
    FrequentOriginResponseType | ErrorResponseType
  >(`/${APIConstants.emissions}/frequent-origins/pyme/${pyme_id}`);

  if (status !== 200) {
    return Promise.reject(
      new Error((data as ErrorResponseType).payload?.error)
    );
  }

  return data as FrequentOriginResponseType;
}
