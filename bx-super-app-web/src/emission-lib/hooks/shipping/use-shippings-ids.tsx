import { useShippings } from './use-shippings';

export function useShippingsIds(): string[] {
  const [shippingAtoms] = useShippings();
  return shippingAtoms.map((shippingAtom) => shippingAtom.toString());
}
