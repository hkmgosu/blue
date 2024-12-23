import { emissionTypeAtom } from 'emission-lib/store';
import { useAtom, SetStateAction } from 'jotai';

export function useEmissionType(): [
  string,
  (update: SetStateAction<string>) => void
] {
  return useAtom(emissionTypeAtom);
}
