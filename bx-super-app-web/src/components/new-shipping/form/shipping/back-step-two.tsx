import { BxLeft } from '@bx-design/react-icons';

import styles from 'components/new-shipping/form/shipping/shipping-back.module.css';
import { useDestinyView } from 'emission-lib/hooks/emission-state';

type Props = {
  step: number;
};

function NewShippingFormShippingBackOnStepTwo({ step }: Props): JSX.Element {
  const [, setDestinyView] = useDestinyView();

  const handleClick = (): void => {
    setDestinyView(step);
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

export default NewShippingFormShippingBackOnStepTwo;
