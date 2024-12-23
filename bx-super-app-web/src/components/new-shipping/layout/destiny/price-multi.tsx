import { parseToMoney } from 'components/new-shipping/utils/parse-to-money';
import styles from './price-multi.module.scss';
import { useShippingPackageTotalValue } from 'emission-lib/hooks/shipping-package';

function NewShippingLayoutDestinyPriceMulti(): JSX.Element {
  const [shippingPackageTotal] = useShippingPackageTotalValue();
  return (
    <div className={styles.price}>{parseToMoney(shippingPackageTotal)}</div>
  );
}

export default NewShippingLayoutDestinyPriceMulti;
