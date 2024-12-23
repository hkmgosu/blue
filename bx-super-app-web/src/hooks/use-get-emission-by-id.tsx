import { useQuery } from 'react-query';

import { getEmissionById } from 'api/emissions/emission';
import type { EmissionType } from 'types/emission';

type ReturnType = {
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  data: EmissionType | undefined;
  isSuccess: boolean;
  isIdle: boolean;
};

export function useGetEmissionById(emissionId: string): ReturnType {
  const { isLoading, isError, error, data, isSuccess, isIdle } = useQuery<
    EmissionType | undefined,
    Error
  >('get-emission-by-id', () => getEmissionById(emissionId));

  return {
    isLoading,
    isError,
    error,
    data,
    isSuccess,
    isIdle,
  };
}
