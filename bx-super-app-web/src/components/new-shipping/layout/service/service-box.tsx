import { useMemo, ReactNode } from 'react';
import cs from 'classnames';
import { BxChronometer, BxTruck } from '@bx-design/react-icons';

import styles from './service-box.module.scss';
import { useShippingPackageService } from 'emission-lib/hooks/shipping-package';

type Props = {
  serviceType: 'STANDARD' | 'NEXT DAY' | null;
  children: ReactNode;
};

function NewShippingLayoutServiceBox({
  serviceType,
  children,
}: Props): JSX.Element {
  const [shipping, setShipping] = useShippingPackageService();
  const isActive = useMemo(() => {
    const service = shipping.service !== null && shipping.service;
    return service === serviceType;
  }, [serviceType, shipping.service]);

  return (
    <div
      className={cs(styles.wrapper, {
        [styles.wrapperIsActive]: isActive,
      })}
      onClick={() => {
        if (serviceType) {
          setShipping((prev) => ({ ...prev, service: serviceType }));
        }
      }}
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
          {/* {serviceType === 'NEXT DAY' ? '24 hrs' : '48 hrs'} */}
          Blue Express
        </div>
      </header>
      <div
        className={cs(styles.title, {
          [styles.titleIsActive]: isActive,
        })}
      >
        {serviceType === 'NEXT DAY'
          ? 'Envío al día siguiente'
          : 'Envío en 2 días hábiles'}
      </div>
      <div className={styles.line} />

      <div
        className={cs(styles.contentWrapper, {
          [styles.contentWrapperIsActive]: isActive,
        })}
      >
        {children}
      </div>
    </div>
  );
}

export default NewShippingLayoutServiceBox;
