import { useMemo } from 'react';
import { useAtom, SetStateAction } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { useShippingContext } from '../../contexts/shipping-context';

export function useShippingSaveFrequentClientAlias(): [
  string | undefined,
  (update?: SetStateAction<string | undefined>) => void
] {
  const { shippingAtom } = useShippingContext();
  const shippingSaveFrequentClientAliasAtom = useMemo(
    () =>
      focusAtom(shippingAtom, (optic) => optic.prop('frequent_alias_client')),
    [shippingAtom]
  );
  shippingSaveFrequentClientAliasAtom.debugLabel = `shippingSaveFrequentClientAliasAtom-${shippingAtom.toString()}`;
  return useAtom(shippingSaveFrequentClientAliasAtom);
}
