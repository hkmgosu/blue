import { emissionMultiIsValidAtom } from 'emission-lib/store';
import { SetStateAction, useAtom } from 'jotai';

export function useMultiEmissionIsValid(): [
  boolean,
  (update: SetStateAction<boolean>) => void
] {
  return useAtom(emissionMultiIsValidAtom);
}
