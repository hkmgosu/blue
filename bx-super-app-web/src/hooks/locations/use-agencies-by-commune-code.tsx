import {
  useQuery,
  QueryStatus,
  RefetchOptions,
  QueryObserverResult,
} from 'react-query';
import { useEffect, useState } from 'react';

import { getAgenciesByCommuneCode } from 'api/locations';
import type { AgencyType } from 'types/locations';

type ArgsType = {
  commune_code: string;
  cacheKey: string;
};

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

function useAgenciesByCommuneCode({
  commune_code,
  cacheKey,
}: ArgsType): UseAgenciesType {
  const [, setRefetchAgencies] = useState(true);
  const {
    status,
    data: agencies,
    error,
    isError,
    isSuccess,
    isLoading,
    isIdle,
    refetch,
  } = useQuery<AgencyType[], Error>(
    cacheKey,
    () => getAgenciesByCommuneCode(commune_code),
    {
      refetchOnMount: true,
    }
  );

  useEffect(() => {
    if (agencies) {
      setRefetchAgencies(false);
    }
  }, [agencies]);

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

export { useAgenciesByCommuneCode };
