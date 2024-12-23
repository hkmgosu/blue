import { useAtom, SetStateAction } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { emitterAtom } from '../../store';

const emitterPymeNameAtom = focusAtom(emitterAtom, (optic) =>
  optic.prop('pyme_name')
);
emitterPymeNameAtom.debugLabel = 'emitterPymeNameAtom';

export function useEmitterPymeName(): [
  string,
  (update: SetStateAction<string>) => void
] {
  return useAtom(emitterPymeNameAtom);
}
