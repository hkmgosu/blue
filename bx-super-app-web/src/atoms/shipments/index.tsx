import { atom, useAtom } from 'jotai';
import { TShippingPaths } from 'config';

export const orderServiceInputAtom = atom('');
export const shipmentTypeAtom = atom<TShippingPaths>('unitary');

export function useShippingType(): [
  TShippingPaths,
  (value: TShippingPaths) => void
] {
  return useAtom(shipmentTypeAtom);
}
