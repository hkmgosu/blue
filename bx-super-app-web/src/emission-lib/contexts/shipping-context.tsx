import { createContext, ReactNode, useContext, memo } from 'react';
import { PrimitiveAtom } from 'jotai';

import { ShippingStoreType } from '../types';

interface IContext {
  shippingAtom: PrimitiveAtom<ShippingStoreType>;
  removeShippingAtom: (update: PrimitiveAtom<ShippingStoreType>) => void;
}

const ShippingContext = createContext<IContext>({} as IContext);

type Props = {
  children: ReactNode;
  shippingAtom: PrimitiveAtom<ShippingStoreType>;
  removeShippingAtom: (update: PrimitiveAtom<ShippingStoreType>) => void;
};

function ShippingProviderNoMemo({
  children,
  shippingAtom,
  removeShippingAtom,
}: Props): JSX.Element {
  shippingAtom.debugLabel = `shippingAtom-${shippingAtom.toString()}`;

  return (
    <ShippingContext.Provider value={{ shippingAtom, removeShippingAtom }}>
      {children}
    </ShippingContext.Provider>
  );
}

function memoCompare(prevProps: Props, nextProps: Props): boolean {
  return (
    prevProps.shippingAtom.toString() === nextProps.shippingAtom.toString()
  );
}

const ShippingProvider = memo(ShippingProviderNoMemo, memoCompare);

function useShippingContext(): IContext {
  const context = useContext(ShippingContext);
  if (typeof context === 'undefined') {
    throw new Error(
      'useShippingContext must be used within a ShippingProvider'
    );
  }
  return context;
}

export { ShippingProvider, useShippingContext };
