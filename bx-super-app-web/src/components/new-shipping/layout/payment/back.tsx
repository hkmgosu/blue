import { useCallback } from 'react';
import { BxLeft } from '@bx-design/react-icons';

import styles from 'components/new-shipping/layout/payment/back.module.scss';
import { useStep } from 'emission-lib/hooks/emission-state';

type Props = {
  isMassive?: boolean;
};

function NewShippingLayoutPaymentBack({ isMassive }: Props): JSX.Element {
  const [, setStep] = useStep();

  const handleChange = useCallback(() => {
    if (isMassive) {
      setStep(3);
    } else {
      setStep(2);
    }
  }, [setStep, isMassive]);

  return (
    <div className={styles.link} onClick={handleChange}>
      <div className={styles.boxIcon}>
        <BxLeft color='var(--bx-color-lblue)' />
      </div>
      <div>Volver</div>
    </div>
  );
}

export default NewShippingLayoutPaymentBack;
