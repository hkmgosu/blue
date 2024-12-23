import {
  BxClock,
  BxPackage,
  BxPersonCircle,
  BxPin,
} from '@bx-design/react-icons';

import styles from './multi-item-content-detail-data-left.module.scss';
import { parseToMoney } from 'components/new-shipping/utils/parse-to-money';
import { slaToService } from 'components/new-shipping/utils/sla-to-service';
import { useShipping } from 'emission-lib/hooks/shipping';
import {
  useShippingPackageService,
  useShippingPackageSize,
  useShippingPackageTotal,
  useShippingPackageTotalValue,
} from 'emission-lib/hooks/shipping-package';

function NewShippingLayoutSummaryMultiItemContentDetailDataLeft(): JSX.Element {
  const [shipping] = useShipping();
  const [packageService] = useShippingPackageService();
  const packageTotal = useShippingPackageTotal();
  const [packageTotalValue] = useShippingPackageTotalValue();
  const [packageSize] = useShippingPackageSize();

  return (
    <>
      <div className={styles.subTitle}>Destino</div>

      <div className={styles.content}>
        <div className={styles.subContent}>
          <div className={styles.boxIcon}>
            <BxPersonCircle size={15} />
          </div>
          <div className={styles.text}>
            {shipping.receiver.name} {shipping.receiver.lastName}
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.subContent}>
          <div className={styles.boxIcon}>
            <BxPin size={15} />
          </div>
          <div className={styles.text}>
            {shipping.destiny.address.street}{' '}
            {shipping.destiny.address.street_number},{' '}
            {shipping.destiny.address.city}
          </div>
        </div>
      </div>

      <div className={styles.line} />

      <div className={styles.subTitle}>Encomienda</div>

      <div className={styles.content}>
        <div className={styles.subContent}>
          <div className={styles.boxIcon}>
            <BxPackage size={15} />
          </div>
          <div className={styles.text}>{packageSize}</div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.subContent}>
          <div className={styles.boxIcon}>
            <BxClock size={15} />
          </div>
          <div className={styles.text}>
            Tipo de envío: {slaToService(packageService.sla)}
          </div>
        </div>
      </div>

      <div className={styles.line} />

      <div className={styles.subTitle}>Valor de envío</div>

      <div className={styles.contentValue}>
        <div className={styles.contentValueInfo}>
          <div className={styles.contentValueText}>Valor de envío:</div>
          <div className={styles.contentValueVal}>
            {parseToMoney(Math.round(packageService.price))}
          </div>
        </div>

        <div className={styles.contentValueInfo}>
          <div className={styles.contentValueText}>Garantía extendida:</div>
          <div className={styles.contentValueVal}>
            {parseToMoney(Math.round(packageTotal.warrantyValue))}
          </div>
        </div>

        <div className={styles.contentValueInfo}>
          <div className={styles.contentValueText}>IVA:</div>
          <div className={styles.contentValueVal}>
            {parseToMoney(Math.round(packageTotal.tax))}
          </div>
        </div>
      </div>
      <div className={styles.line} />

      <div className={styles.contentTotal}>
        <div className={styles.contentTotalText}>Total</div>
        <div className={styles.contentTotalValue}>
          {parseToMoney(Math.round(packageTotalValue))}
        </div>
      </div>
    </>
  );
}

export default NewShippingLayoutSummaryMultiItemContentDetailDataLeft;
