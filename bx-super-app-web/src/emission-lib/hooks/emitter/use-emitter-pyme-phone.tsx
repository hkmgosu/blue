import { useAtom, SetStateAction } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { emitterAtom } from '../../store';

const emitterPymePhoneAtom = focusAtom(emitterAtom, (optic) =>
  optic.prop('phone')
);
emitterPymePhoneAtom.debugLabel = 'emitterPymePhoneAtom';

export function useEmitterPymePhone(): [
  string,
  (update: SetStateAction<string>) => void
] {
  return useAtom(emitterPymePhoneAtom);
}
