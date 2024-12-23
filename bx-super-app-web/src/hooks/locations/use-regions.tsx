import { useQuery, QueryStatus } from 'react-query';

import { getRegions } from 'api/locations';
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

const useRegions = (key?: string): useRegionsType => {
  const {
    status,
    data: regions,
    error,
    isError,
    isSuccess,
    isLoading,
    isIdle,
  } = useQuery<RegionType[], Error>(key || 'regions', getRegions);

  return {
    isIdle,
    isLoading,
    isError,
    isSuccess,

    status,
    regions,
    error,
  };
};

export { useRegions };
