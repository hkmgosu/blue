import { useAtom, SetStateAction } from 'jotai';

import { receiverAddressIsCollapsedAtom } from '../../store';

export function useReceiverAddressIsCollapsed(): [
  boolean,
  (update: SetStateAction<boolean>) => void
] {
  return useAtom(receiverAddressIsCollapsedAtom);
}
