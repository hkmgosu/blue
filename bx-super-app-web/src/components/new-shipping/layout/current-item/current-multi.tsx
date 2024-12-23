import styles from 'components/new-shipping/layout/current-item/current-multi.module.scss';

import NewShippingLayoutCurrentTabMulti from './current-multi-tab';
import { useShippings, useShippingSelected } from 'emission-lib/hooks/shipping';
import { ShippingProvider } from 'emission-lib/contexts/shipping-context';
import NewShippingLayoutCurrentItemCurrentMultiTabs from './current-multi-tabs';

export default function NewShippingLayoutCurrentItemCurrentMulti(): JSX.Element {
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
      <div className={styles.specialCard}>
        <NewShippingLayoutCurrentTabMulti />
        <div className={styles.cardPadding}>
          <NewShippingLayoutCurrentItemCurrentMultiTabs />
        </div>
      </div>
    </ShippingProvider>
  );
}
