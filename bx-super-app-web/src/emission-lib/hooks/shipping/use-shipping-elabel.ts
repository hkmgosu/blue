import { useAtom, atom } from 'jotai';

export enum ShippingElabelReturnedCode {
  ok = 0,
  assigned = 1,
  unregister = 2,
  unknown = 404,
}

export interface ShippingElabelStatus {
  returnedCode: ShippingElabelReturnedCode;
  message: string;
}

export type ShippingElabel = {
  value: string;
  loading?: boolean;
  modal?: boolean;
  status?: ShippingElabelStatus;
};

const atomShippingElabel = atom({
  value: '',
} as ShippingElabel);

export function useShippingElabel(): [
  ShippingElabel,
  (value: ShippingElabel) => void
] {
  return useAtom(atomShippingElabel);
}
