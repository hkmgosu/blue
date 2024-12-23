import styles from './address-multi.module.scss';
import { useShippingDestiny } from 'emission-lib/hooks/shipping-destiny';

function NewShippingLayoutDestinyAddressMulti(): JSX.Element {
  const [shippingAddress] = useShippingDestiny();

  return (
    <div className={styles.wrapper}>
      <div className={styles.up}>
        <span className={styles.street}>
          {shippingAddress.address.street}{' '}
          {shippingAddress.address.street ? ', ' : ''}
          {shippingAddress.address.street_number} {'  '}
          {shippingAddress.address.city}
        </span>
      </div>
    </div>
  );
}

export default NewShippingLayoutDestinyAddressMulti;
