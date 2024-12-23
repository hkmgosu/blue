import {
  useQuery,
  QueryStatus,
  RefetchOptions,
  QueryObserverResult,
} from 'react-query';

import { getCommunesByIso } from 'api/locations';
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

function useComunesByIso(iso: string, key?: string): useComunesType {
  const {
    status,
    data: communes,
    error,
    isError,
    isSuccess,
    isLoading,
    isIdle,
    refetch,
  } = useQuery<CommuneType[], Error>(key || 'communes-by-iso', () =>
    getCommunesByIso(iso)
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

export { useComunesByIso };
