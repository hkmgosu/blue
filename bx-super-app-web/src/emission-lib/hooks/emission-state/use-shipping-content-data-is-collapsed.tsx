import { useAtom, SetStateAction } from 'jotai';

import { shippingContentDataIsCollapsedAtom } from '../../store';

export function useShippingContentDataIsCollapsed(): [
  boolean,
  (update: SetStateAction<boolean>) => void
] {
  return useAtom(shippingContentDataIsCollapsedAtom);
}
