import { useQuery } from 'react-query';

import { getResumeEmissionById } from 'api/emissions/emission';

import type { ResumeEmissionType } from 'types/emission';

type ReturnType = {
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  data: ResumeEmissionType | undefined;
  isSuccess: boolean;
  isIdle: boolean;
};

export function useGetResumeEmissionById(emissionId: string): ReturnType {
  const { isLoading, isError, error, data, isSuccess, isIdle } = useQuery<
    ResumeEmissionType | undefined,
    Error
  >('get-resume-emission-id', () => getResumeEmissionById(emissionId));
  return {
    isLoading,
    isError,
    error,
    data,
    isSuccess,
    isIdle,
  };
}
