import { getPopupApi, popUpType } from 'api/popup';
import { QueryObserverResult, RefetchOptions, useQuery } from 'react-query';

type ReturnPopupHook = {
  popup: popUpType | undefined;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: Error | null;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<popUpType, Error>>;
};

export function usePopup(): ReturnPopupHook {
  const {
    data: popup,
    isLoading,
    isError,
    error,
    isSuccess,
    refetch,
  } = useQuery<popUpType, Error>('popup', getPopupApi, {
    refetchOnWindowFocus: true,
    staleTime: 60000,
  });

  return {
    popup,
    isLoading,
    isSuccess,
    isError,
    error,
    refetch,
  };
}
