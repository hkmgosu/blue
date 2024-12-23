import { atom, useAtom } from 'jotai';

import { useShippings } from './use-shippings';

const shippingSelectedAtom = atom('');
shippingSelectedAtom.debugLabel = 'shippingSelectedAtom';

export function useShippingSelected(): [string, (update: string) => void] {
  const [shippingAtoms] = useShippings();
  shippingSelectedAtom.onMount = (setSelected) =>
    setSelected(shippingAtoms[0].toString());
  return useAtom(shippingSelectedAtom);
}
