import { useMemo } from 'react';
import { useAtom, SetStateAction } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { useShippingContext } from '../../contexts/shipping-context';

export function useShippingSaveFrequentPackageAlias(): [
  string | undefined,
  (update?: SetStateAction<string | undefined>) => void
] {
  const { shippingAtom } = useShippingContext();
  const shippingSaveFrequentPackageAliasAtom = useMemo(
    () =>
      focusAtom(shippingAtom, (optic) => optic.prop('frequent_alias_package')),
    [shippingAtom]
  );
  shippingSaveFrequentPackageAliasAtom.debugLabel = `shippingSaveFrequentPackageAliasAtom-${shippingAtom.toString()}`;
  return useAtom(shippingSaveFrequentPackageAliasAtom);
}
