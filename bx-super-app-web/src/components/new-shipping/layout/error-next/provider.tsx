import { useShippings, useShippingSelected } from 'emission-lib/hooks/shipping';
import { ShippingProvider } from 'emission-lib/contexts/shipping-context';
import NewShippingLayoutErrorNextValidate from './error-validate';
import NewShippingErrorNext from '.';

export default function NewShippingLayoutErrorNextProvider(): JSX.Element {
  const [selected] = useShippingSelected();
  const [shippingAtoms, removeShippingAtom] = useShippings();

  return (
    <ShippingProvider
      shippingAtom={
        shippingAtoms.find(
          (shippingAtom) => shippingAtom.toString() === selected
        ) || shippingAtoms[0]
      }
      removeShippingAtom={removeShippingAtom}
    >
      <NewShippingLayoutErrorNextValidate />
      <NewShippingErrorNext />
    </ShippingProvider>
  );
}
