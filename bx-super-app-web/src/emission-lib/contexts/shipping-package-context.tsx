import { createContext, ReactNode, useContext, memo } from 'react';
import { PrimitiveAtom } from 'jotai';

import { ShippingPackageType } from '../types';

interface IContext {
  shippingPackageAtom: PrimitiveAtom<ShippingPackageType>;
  removeShippingPackageAtom: (
    update: PrimitiveAtom<ShippingPackageType>
  ) => void;
}

const ShippingPackageContext = createContext<IContext>({} as IContext);

type Props = {
  children: ReactNode;
  shippingPackageAtom: PrimitiveAtom<ShippingPackageType>;
  removeShippingPackageAtom: (
    update: PrimitiveAtom<ShippingPackageType>
  ) => void;
};

function ShippingPackageProviderNoMemo({
  children,
  shippingPackageAtom,
  removeShippingPackageAtom,
}: Props): JSX.Element {
  shippingPackageAtom.debugLabel = `shippingPackageAtom-${shippingPackageAtom.toString()}`;

  return (
    <ShippingPackageContext.Provider
      value={{ shippingPackageAtom, removeShippingPackageAtom }}
    >
      {children}
    </ShippingPackageContext.Provider>
  );
}

function memoCompare(prevProps: Props, nextProps: Props): boolean {
  return (
    prevProps.shippingPackageAtom.toString() ===
    nextProps.shippingPackageAtom.toString()
  );
}

const ShippingPackageProvider = memo(
  ShippingPackageProviderNoMemo,
  memoCompare
);

function useShippingPackageContext(): IContext {
  const context = useContext(ShippingPackageContext);
  if (typeof context === 'undefined') {
    throw new Error(
      'useShippingPackageContext must be used within a ShippingPackageProvider'
    );
  }
  return context;
}

export { ShippingPackageProvider, useShippingPackageContext };
