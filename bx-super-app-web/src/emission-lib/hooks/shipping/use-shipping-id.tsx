import { useShippingContext } from '../../contexts/shipping-context';

export function useShippingId(): string {
  const { shippingAtom } = useShippingContext();
  return shippingAtom.toString();
}
