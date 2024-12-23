import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { storeAtom } from '../../store';
import { useShippingsTotal } from '../shipping/use-shippings-total';

const warrantyAtom = focusAtom(storeAtom, (optic) => optic.prop('warranty'));
warrantyAtom.debugLabel = 'warrantyAtom';

export function useWarranty(): number {
  const shippingTotal = useShippingsTotal();
  const [warranty, setWarranty] = useAtom(warrantyAtom);

  useEffect(() => {
    setWarranty(shippingTotal.warrantyValue);
  }, [shippingTotal.warrantyValue, setWarranty]);

  return warranty;
}
