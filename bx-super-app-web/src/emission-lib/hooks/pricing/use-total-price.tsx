import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { storeAtom } from '../../store';
import { usePromotionalCodeFraction } from '../emission-state/use-promotional-code-fraction';
import { useDiscount } from '../promotion/use-discount';
import { useShippingsTotal } from '../shipping/use-shippings-total';
import { useTax } from './use-tax';
import { usePromotionalCodeFree } from '../emission-state';

export const totalPriceAtom = focusAtom(storeAtom, (optic) =>
  optic.prop('total_price')
);
totalPriceAtom.debugLabel = 'totalPriceAtom';

export function useTotalPrice(): number {
  const [totalPrice, setTotalPrice] = useAtom(totalPriceAtom);
  const [isFraction] = usePromotionalCodeFraction();
  const shippingTotal = useShippingsTotal();
  const [discount] = useDiscount();
  const tax = useTax();
  const [isFree] = usePromotionalCodeFree();

  const _discount = isFraction ? discount / 100 : discount;

  useEffect(() => {
    if (isFree) {
      setTotalPrice(shippingTotal.warrantyValue);
      return;
    }
    if (isFraction) {
      const toTotal =
        shippingTotal.price +
        shippingTotal.warrantyValue -
        shippingTotal.price * _discount +
        tax;
      const validateTotal = toTotal <= 50 ? 50 : toTotal;
      setTotalPrice(validateTotal);
    } else {
      const toTotal =
        shippingTotal.price + shippingTotal.warrantyValue - _discount + tax;
      const validateTotal = toTotal <= 50 ? 50 : toTotal;
      setTotalPrice(validateTotal);
    }
  }, [
    _discount,
    isFraction,
    setTotalPrice,
    shippingTotal.price,
    shippingTotal.warrantyValue,
    tax,
    isFree,
  ]);

  return totalPrice;
}
