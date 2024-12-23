import { BxLeft } from '@bx-design/react-icons';

import styles from 'components/new-shipping/form/shipping/shipping-back.module.css';
import { useStep } from 'emission-lib/hooks/emission-state';

function NewShippingFormShippingBack(): JSX.Element {
  const [, setStep] = useStep();

  const handleClick = (): void => {
    setStep(1);
  };

  return (
    <div className={styles.backLink} onClick={handleClick}>
      <div className={styles.backBoxIcon}>
        <BxLeft color='var(--bx-color-lblue)' />
      </div>
      <div>Volver atrás</div>
    </div>
  );
}

export default NewShippingFormShippingBack;
