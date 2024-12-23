import { useAtom, SetStateAction } from 'jotai';
import { PromotionalCodeType } from 'types/promotional-code';
import { promotionalCodeResponseAtom } from '../../store';

export function usePromotionalCodeResponse(): [
  PromotionalCodeType | undefined,
  (update: SetStateAction<PromotionalCodeType | undefined>) => void
] {
  return useAtom(promotionalCodeResponseAtom);
}
