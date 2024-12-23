import { slaToService } from 'components/new-shipping/utils/sla-to-service';
import styles from './days-multi.module.scss';
import { useShippingPackageService } from 'emission-lib/hooks/shipping-package';

function NewShippingLayoutDestinyDaysMulti(): JSX.Element {
  const [shippingPackageService] = useShippingPackageService();

  return (
    <div className={styles.days}>
      {slaToService(shippingPackageService.sla)}
    </div>
  );
}

export default NewShippingLayoutDestinyDaysMulti;
