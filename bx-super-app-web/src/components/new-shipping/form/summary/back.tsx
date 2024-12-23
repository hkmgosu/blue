import { useCallback } from 'react';
import { BxLeft } from '@bx-design/react-icons';

import styles from 'components/new-shipping/form/summary/summary-back.module.scss';
import { useStep } from 'emission-lib/hooks/emission-state';

type Props = {
  isMassive?: boolean;
};

function NewShippingFormSummaryBack({ isMassive }: Props): JSX.Element {
  const [, setStep] = useStep();

  const handleChange = useCallback(() => {
    if (isMassive) {
      setStep(3);
    } else {
      setStep(2);
    }
  }, [setStep, isMassive]);
  return (
    <div className={styles.wrapper}>
      <div className={styles.link} onClick={handleChange}>
        <div className={styles.boxIcon}>
          <BxLeft color='var(--bx-color-lblue)' />
        </div>
        <div>Volver atrás</div>
      </div>
    </div>
  );
}

export default NewShippingFormSummaryBack;
