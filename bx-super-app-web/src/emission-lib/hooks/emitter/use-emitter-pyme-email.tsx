import { useAtom, SetStateAction } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { emitterAtom } from '../../store';

const emitterPymeEmailAtom = focusAtom(emitterAtom, (optic) =>
  optic.prop('email')
);
emitterPymeEmailAtom.debugLabel = 'emitterPymeEmailAtom';

export function useEmitterPymeEmail(): [
  string,
  (update: SetStateAction<string>) => void
] {
  return useAtom(emitterPymeEmailAtom);
}
