import {
  useQuery,
  QueryStatus,
  RefetchOptions,
  QueryObserverResult,
} from 'react-query';

import { getCommunesCache } from 'api/locations/to-ls';
import type { CommuneType } from 'types/locations';

type useComunesType = {
  isIdle: boolean;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  communes?: Array<CommuneType>;
  status: QueryStatus;
  error: unknown;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<CommuneType[], unknown>>;
};

export function useComunesCache(): useComunesType {
  const {
    status,
    data: communes,
    error,
    isError,
    isSuccess,
    isLoading,
    isIdle,
    refetch,
  } = useQuery<CommuneType[], Error>('locations-communes', () =>
    getCommunesCache()
  );

  return {
    isIdle,
    isLoading,
    isError,
    isSuccess,

    status,
    communes,
    error,
    refetch,
  };
}
