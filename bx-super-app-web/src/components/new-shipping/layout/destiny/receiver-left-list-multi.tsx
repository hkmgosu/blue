import NewShippingLayoutDestinyReceiverLeftItemMulti from './receiver-left-item-multi';
import { useShippings } from 'emission-lib/hooks/shipping';
import { ShippingProvider } from 'emission-lib/contexts/shipping-context';

function NewShippingLayoutDestinyReceiverLeftListMulti(): JSX.Element {
  const [shippingAtoms, removeShippingAtom] = useShippings();

  return (
    <>
      {shippingAtoms.map((shippingAtom, index) => (
        <ShippingProvider
          shippingAtom={shippingAtom}
          key={shippingAtom.toString()}
          removeShippingAtom={removeShippingAtom}
        >
          <NewShippingLayoutDestinyReceiverLeftItemMulti
            idNumber={String(index + 1)}
          />
        </ShippingProvider>
      ))}
    </>
  );
}

export default NewShippingLayoutDestinyReceiverLeftListMulti;
