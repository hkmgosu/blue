import styles from './receiver-left-item-multi.module.scss';
import classnames from 'classnames';

import NewShippingLayoutDestinyReceiverNameMulti from './receiver-name-multi';
import NewShippingLayoutDestinyAddressMulti from './address-multi';
import NewShippingLayoutPackageProvider from 'components/new-shipping/provider/package-provider';
import NewShippingLayoutDestinyDaysMulti from './days-multi';
import NewShippingLayoutDestinyPriceMulti from './price-multi';
import NewShippingLayoutDestinyReceiverLeftItemStatusMulti from './receiver-left-item-status-multi';
import NewShippingLayoutDestinyReceiverLeftItemEditMulti from './receiver-left-item-edit-multi';
import NewShippingLayoutDestinyReceiverLeftItemRemoveMulti from './receiver-left-item-remove-multi';
import {
  useShippingId,
  useShippingSelected,
} from 'emission-lib/hooks/shipping';

type Props = {
  idNumber: string;
};

function NewShippingLayoutDestinyReceiverLeftItemMulti({
  idNumber,
}: Props): JSX.Element {
  const shippingId = useShippingId();
  const [selected] = useShippingSelected();

  return (
    <div
      className={classnames(styles.grid, {
        [styles.selectedGrid]: shippingId === selected,
      })}
    >
      <div className={styles.gridCol1}>
        <div className={styles.idNumber}>{idNumber}</div>
      </div>
      <div className={styles.gridCol}>
        <NewShippingLayoutDestinyReceiverNameMulti />
        <NewShippingLayoutDestinyAddressMulti />
      </div>
      <NewShippingLayoutPackageProvider>
        <div className={styles.gridCol2}>
          <NewShippingLayoutDestinyDaysMulti />
          <NewShippingLayoutDestinyPriceMulti />
        </div>
        <div className={styles.gridCol3}>
          <NewShippingLayoutDestinyReceiverLeftItemStatusMulti />
        </div>
      </NewShippingLayoutPackageProvider>
      <div className={styles.gridCol5}>
        <NewShippingLayoutDestinyReceiverLeftItemEditMulti />
        <NewShippingLayoutDestinyReceiverLeftItemRemoveMulti />
      </div>
    </div>
  );
}

export default NewShippingLayoutDestinyReceiverLeftItemMulti;
