import { ReactNode } from 'react';

import { useShippings } from 'emission-lib/hooks/shipping';
import { ShippingProvider } from 'emission-lib/contexts/shipping-context';

type Props = {
  children: ReactNode;
};

export default function UnitaryShippingProvider({
  children,
}: Props): JSX.Element {
  const [shippingAtoms, removeShippingAtom] = useShippings();
  return (
    <>
      {shippingAtoms.map((shippingAtom) => (
        <ShippingProvider
          shippingAtom={shippingAtom}
          key={shippingAtom.toString()}
          removeShippingAtom={removeShippingAtom}
        >
          {children}
        </ShippingProvider>
      ))}
    </>
  );
}
