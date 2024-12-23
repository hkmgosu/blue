import styles from './multi-left.module.scss';
import NewShippingLayoutSummaryMultiItemLeft from 'components/new-shipping/layout/summary/multi-item-left';
import { useShippings } from 'emission-lib/hooks/shipping';
import { ShippingProvider } from 'emission-lib/contexts/shipping-context';

function NewShippingLayoutSummaryMultiLeft(): JSX.Element {
  const [shippingAtoms, removeShippingAtom] = useShippings();

  return (
    <div className={styles.list}>
      {shippingAtoms.map((shippingAtom) => (
        <ShippingProvider
          shippingAtom={shippingAtom}
          key={shippingAtom.toString()}
          removeShippingAtom={removeShippingAtom}
        >
          <NewShippingLayoutSummaryMultiItemLeft
            position={
              shippingAtoms.findIndex(
                (shipAtom) => shipAtom.toString() === shippingAtom.toString()
              ) + 1
            }
            totals={shippingAtoms.length}
          />
        </ShippingProvider>
      ))}
    </div>
  );
}

export default NewShippingLayoutSummaryMultiLeft;
