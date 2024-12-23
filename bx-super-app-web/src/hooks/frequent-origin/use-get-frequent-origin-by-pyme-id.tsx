import { getFrequentOriginByPymeId } from 'api/emissions/frequent-origin';
import {
  useQuery,
  QueryStatus,
  RefetchOptions,
  QueryObserverResult,
} from 'react-query';
import { FrequentOriginResponseType } from 'types/frequent-origin';

type useFrequentOriginReturnType = {
  isIdle: boolean;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  frequentOrigin?: FrequentOriginResponseType;
  status: QueryStatus;
  error: unknown;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<
    QueryObserverResult<FrequentOriginResponseType | Error, unknown>
  >;
};

export function useGetFrequentOriginByPymeId(
  pyme_id: string,
  key?: string
): useFrequentOriginReturnType {
  const {
    status,
    data: frequentOrigin,
    error,
    isError,
    isSuccess,
    isLoading,
    isIdle,
    refetch,
  } = useQuery<FrequentOriginResponseType, Error>(
    key || 'frequent-origin-by-pyme-id',
    () => getFrequentOriginByPymeId(pyme_id),
    {
      refetchOnMount: true,
      staleTime: 60000,
    }
  );

  return {
    isIdle,
    isLoading,
    isError,
    isSuccess,

    status,
    frequentOrigin,
    error,
    refetch,
  };
}
