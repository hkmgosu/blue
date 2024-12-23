import {
  useQuery,
  QueryStatus,
  RefetchOptions,
  QueryObserverResult,
} from 'react-query';
import { getRegionByIso } from 'api/locations';
import { RegionType } from 'types/locations';

type ReturnType = {
  isIdle: boolean;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  region?: RegionType;
  status: QueryStatus;
  error: Error | null;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<RegionType, Error>>;
};

export function useGetRegionByIso(
  region_iso: string,
  cacheKey?: string
): ReturnType {
  const {
    status,
    data: region,
    error,
    isError,
    isSuccess,
    isLoading,
    isIdle,
    refetch,
  } = useQuery<RegionType, Error>(cacheKey || 'region-by-iso', () =>
    getRegionByIso(region_iso)
  );

  return {
    isIdle,
    isLoading,
    isError,
    isSuccess,

    status,
    region,
    error,
    refetch,
  };
}
