import { getFrequentClientsByPymeId } from 'api/frequent-clients';
import {
  useQuery,
  QueryStatus,
  RefetchOptions,
  QueryObserverResult,
} from 'react-query';
import type { FrequentClientsResponseType } from 'types/frequent-clients';

type useFrequentClientsReturnType = {
  isIdle: boolean;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  frequentClients?: FrequentClientsResponseType[];
  status: QueryStatus;
  error: unknown;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<
    QueryObserverResult<FrequentClientsResponseType[] | Error, unknown>
  >;
};

export function useGetFrequentClientsByPymeId(
  pyme_id: string,
  key?: string
): useFrequentClientsReturnType {
  const {
    status,
    data: frequentClients,
    error,
    isError,
    isSuccess,
    isLoading,
    isIdle,
    refetch,
  } = useQuery<FrequentClientsResponseType[], Error>(
    key || `frequent-clients-by-${pyme_id}`,
    () => getFrequentClientsByPymeId(pyme_id),
    {
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      staleTime: 60000,
    }
  );

  return {
    isIdle,
    isLoading,
    isError,
    isSuccess,

    status,
    frequentClients,
    error,
    refetch,
  };
}
