import {
  useQuery,
  QueryStatus,
  RefetchOptions,
  QueryObserverResult,
} from 'react-query';
import { getCommuneByCoordinate } from 'api/locations';
import { CommuneType, GeolocationType } from 'types/locations';

type ReturnType = {
  isIdle: boolean;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  commune?: CommuneType;
  status: QueryStatus;
  error: Error | null;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<CommuneType, Error>>;
};

export function useGetCommuneByCoordinates(
  coordinates: GeolocationType,
  cacheKey?: string
): ReturnType {
  const {
    status,
    data: commune,
    error,
    isError,
    isSuccess,
    isLoading,
    isIdle,
    refetch,
  } = useQuery<CommuneType, Error>(cacheKey || 'commune-by-coordinates', () =>
    getCommuneByCoordinate(coordinates)
  );

  return {
    isIdle,
    isLoading,
    isError,
    isSuccess,

    status,
    commune,
    error,
    refetch,
  };
}
