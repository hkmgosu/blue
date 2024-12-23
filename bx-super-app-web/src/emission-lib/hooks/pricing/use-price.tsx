import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { storeAtom } from '../../store';
import { useShippingsTotal } from '../shipping/use-shippings-total';

const shippingPriceAtom = focusAtom(storeAtom, (optic) =>
  optic.prop('shipping_price')
);
shippingPriceAtom.debugLabel = 'shippingPriceAtom';

export function usePrice(): number {
  const shippingTotal = useShippingsTotal();
  const [price, setPrice] = useAtom(shippingPriceAtom);

  useEffect(() => {
    setPrice(shippingTotal.price);
  }, [shippingTotal.price, setPrice]);

  return price;
}
