import { useMemo, ReactNode } from 'react';
import cs from 'classnames';
import { BxChronometer, BxTruck } from '@bx-design/react-icons';

import styles from 'components/new-shipping/layout/service/wrapper.module.scss';
import type { SlaType } from 'types/pricing';
import { slaToService } from 'components/new-shipping/utils/sla-to-service';
import { useShippingPackageService } from 'emission-lib/hooks/shipping-package';

type Props = {
  serviceType: 'STANDARD' | 'NEXT DAY' | null;
  children: ReactNode;
  sla: SlaType;
  loading?: boolean;
};

function NewShippingLayoutServiceWrapper({
  serviceType,
  sla,
  children,
  loading,
}: Props): JSX.Element {
  const [shipping, setShipping] = useShippingPackageService();

  const isActive = useMemo(
    () => shipping.service === serviceType,
    [serviceType, shipping.service]
  );
  return (
    <div
      className={cs(styles.wrapper, {
        [styles.wrapperIsActive]: isActive,
      })}
      onClick={() => setShipping((prev) => ({ ...prev, service: serviceType }))}
    >
      <header className={styles.header}>
        <div className={styles.boxIcon}>
          {serviceType === 'STANDARD' ? (
            <BxTruck color={isActive ? '#fff' : 'var(--bx-color-blue-fun)'} />
          ) : (
            <BxChronometer
              color={isActive ? '#fff' : 'var(--bx-color-blue-fun)'}
            />
          )}
        </div>
        <div
          className={cs(styles.headerTitle, {
            [styles.headerTitleIsActive]: isActive,
          })}
        >
          {loading ? 'Cargando...' : slaToService(sla)}
        </div>
      </header>
      <div
        className={cs(styles.content, {
          [styles.contentIsActive]: isActive,
        })}
      >
        {children}
      </div>
    </div>
  );
}

export default NewShippingLayoutServiceWrapper;
