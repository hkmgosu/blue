import { APIConstants } from 'config';
import axiosInstance from 'utils/http-interceptor';
import type { ErrorResponseType } from 'types/error-response';
import type { FrequentClientsResponseType } from 'types/frequent-clients';

export async function getFrequentClientsByPymeId(
  pyme_id: string
): Promise<FrequentClientsResponseType[]> {
  if (!pyme_id) {
    return Promise.reject(new Error('Not provided pyme_id'));
  }

  const { status, data } = await axiosInstance.get<
    FrequentClientsResponseType[] | ErrorResponseType
  >(`/${APIConstants.emissions}/frequent-clients/pyme/${pyme_id}`);

  if (status !== 200) {
    return Promise.reject(
      new Error((data as ErrorResponseType).payload?.error)
    );
  }

  return data as FrequentClientsResponseType[];
}
