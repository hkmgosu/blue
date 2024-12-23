import {
  useQuery,
  QueryStatus,
  RefetchOptions,
  QueryObserverResult,
} from 'react-query';

import { getAgenciesCache } from 'api/locations/to-ls';
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

export function useAgenciesCache(): UseAgenciesType {
  const {
    status,
    data: agencies,
    error,
    isError,
    isSuccess,
    isLoading,
    isIdle,
    refetch,
  } = useQuery<AgencyType[], Error>('locations-agencies', () =>
    getAgenciesCache()
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
