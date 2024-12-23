import { useQuery, QueryStatus } from 'react-query';

import { getRegionsCache } from 'api/locations/to-ls';
import type { RegionType } from 'types/locations';

type useRegionsType = {
  isIdle: boolean;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  regions: RegionType[] | undefined;
  status: QueryStatus;
  error: Error | null;
};

export function useRegionsCache(): useRegionsType {
  const {
    status,
    data: regions,
    error,
    isError,
    isSuccess,
    isLoading,
    isIdle,
  } = useQuery<RegionType[], Error>('locations-regions', getRegionsCache);

  return {
    isIdle,
    isLoading,
    isError,
    isSuccess,

    status,
    regions,
    error,
  };
}
