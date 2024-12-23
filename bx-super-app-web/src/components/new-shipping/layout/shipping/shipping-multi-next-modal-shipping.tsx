import styles from './shipping-multi-next-modal.module.scss';
import NewShippingLayoutDestinyDaysMulti from 'components/new-shipping/layout/destiny/days-multi';
import NewShippingLayoutDestinyPriceMulti from 'components/new-shipping/layout/destiny/price-multi';
import NewShippingLayoutDestinyReceiverNameMulti from '../destiny/receiver-name-multi';
import NewShippingLayoutDestinyAddressMulti from '../destiny/address-multi';
import NewShippingLayoutPackageProvider from 'components/new-shipping/provider/package-provider';

type Props = {
  index: number;
};

function NewShippinngMultiModalShipping({ index }: Props): JSX.Element {
  return (
    <NewShippingLayoutPackageProvider>
      <div className={styles.grid}>
        <div className={styles.child}>
          <span className={styles.text}>Envío {index + 1}</span>
        </div>
        <div className={styles.child}>
          <NewShippingLayoutDestinyReceiverNameMulti />
          <div>
            {' '}
            <NewShippingLayoutDestinyDaysMulti />
          </div>
        </div>
        <div className={styles.child}>
          <NewShippingLayoutDestinyAddressMulti />
          <div>
            {' '}
            <NewShippingLayoutDestinyPriceMulti />
          </div>
        </div>
      </div>
    </NewShippingLayoutPackageProvider>
  );
}

export default NewShippinngMultiModalShipping;
