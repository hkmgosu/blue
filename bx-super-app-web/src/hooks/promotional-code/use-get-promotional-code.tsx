import { useMutation, UseMutateFunction } from 'react-query';
import {
  CheckPromotionDataType,
  getPromotionalCode,
} from 'api/promotional-code';
import type { PromotionalCodeType } from 'types/promotional-code';

type UseGetPromotionalCodeType = {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  promotionalCode: PromotionalCodeType | undefined;
  error: Error | null;
  mutate: UseMutateFunction<
    PromotionalCodeType,
    Error,
    CheckPromotionDataType,
    unknown
  >;
};

export function useGetPromotionalCode(): UseGetPromotionalCodeType {
  const {
    mutate,
    data: promotionalCode,
    error,
    isError,
    isSuccess,
    isLoading,
  } = useMutation<PromotionalCodeType, Error, CheckPromotionDataType>(
    (dataForMutate) => getPromotionalCode(dataForMutate)
  );

  return {
    mutate,
    promotionalCode,
    error,
    isError,
    isSuccess,
    isLoading,
  };
}
