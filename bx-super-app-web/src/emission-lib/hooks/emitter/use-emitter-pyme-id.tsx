import { useAtom, SetStateAction } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { emitterAtom } from '../../store';

const emitterPymeIdAtom = focusAtom(emitterAtom, (optic) =>
  optic.prop('pyme_id')
);
emitterPymeIdAtom.debugLabel = 'emitterPymeIdAtom';

export function useEmitterPymeId(): [
  string,
  (update: SetStateAction<string>) => void
] {
  return useAtom(emitterPymeIdAtom);
}
