import { useAtomValue } from 'jotai/utils';

import { emitterAtom } from '../../store';
import { ShippingEmitterType } from '../../types';

export function useEmitter(): ShippingEmitterType {
  return useAtomValue(emitterAtom);
}
