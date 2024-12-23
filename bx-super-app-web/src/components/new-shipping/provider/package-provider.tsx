import { ReactNode } from 'react';

import { useShippingPackages } from 'emission-lib/hooks/shipping-package';
import { ShippingPackageProvider } from 'emission-lib/contexts/shipping-package-context';

type Props = {
  children: ReactNode;
};

export default function NewShippingLayoutPackageProvider({
  children,
}: Props): JSX.Element {
  const [packageAtoms, removePackageAtom] = useShippingPackages();
  return (
    <>
      {packageAtoms.map((packageAtom) => (
        <ShippingPackageProvider
          shippingPackageAtom={packageAtom}
          key={packageAtom.toString()}
          removeShippingPackageAtom={removePackageAtom}
        >
          {children}
        </ShippingPackageProvider>
      ))}
    </>
  );
}
