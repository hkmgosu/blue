import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { storeAtom } from '../../store';
import { usePromotionalCodeFraction } from '../emission-state/use-promotional-code-fraction';
import { useDiscount } from '../promotion/use-discount';
import { useShippingsTotal } from '../shipping/use-shippings-total';

const taxAtom = focusAtom(storeAtom, (optic) => optic.prop('tax'));
taxAtom.debugLabel = 'taxAtom';

export function useTax(): number {
  const [tax, setTax] = useAtom(taxAtom);
  const [isFraction] = usePromotionalCodeFraction();
  const shippingTotal = useShippingsTotal();
  const [discount] = useDiscount();
  const _discount = isFraction ? discount / 100 : discount;

  useEffect(() => {
    if (isFraction) {
      setTax(
        (shippingTotal.price -
          shippingTotal.price * _discount +
          shippingTotal.warrantyValue) *
          0.19
      );
    } else {
      setTax(
        (shippingTotal.price - _discount + shippingTotal.warrantyValue) * 0.19
      );
    }
  }, [
    _discount,
    isFraction,
    setTax,
    shippingTotal.price,
    shippingTotal.warrantyValue,
  ]);

  return tax;
}
