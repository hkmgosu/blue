import {
  useQuery,
  QueryStatus,
  RefetchOptions,
  QueryObserverResult,
} from 'react-query';

import { getAgencies } from 'api/locations';
import type { AgencyType } from 'types/locations';

type UseAgenciesType = {
  isIdle: boolean;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  agencies?: Array<AgencyType>;
  status: QueryStatus;
  error: Error | null;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<AgencyType[], Error>>;
};

function useAgencies(cacheKey?: string): UseAgenciesType {
  const {
    status,
    data: agencies,
    error,
    isError,
    isSuccess,
    isLoading,
    isIdle,
    refetch,
  } = useQuery<AgencyType[], Error>(cacheKey || 'agencies', () =>
    getAgencies()
  );

  return {
    isIdle,
    isLoading,
    isError,
    isSuccess,

    status,
    agencies,
    error,
    refetch,
  };
}

export { useAgencies };
