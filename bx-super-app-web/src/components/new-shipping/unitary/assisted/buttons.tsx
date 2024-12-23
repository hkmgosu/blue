import { useMediaQuery } from 'react-responsive';
import cs from 'classnames';

import styles from './index.module.scss';
import { Button } from 'components/ui-bx/button';

type Props = {
  step: number;
  totalSteps: number;
  setStep: (step: number) => void;
  setAssistModalOpen: (isOpen: boolean) => void;
};

export default function AssistedButtons({
  step,
  totalSteps,
  setStep,
  setAssistModalOpen,
}: Props): JSX.Element {
  const isMobile = useMediaQuery({
    maxDeviceWidth: 680,
  });

  return (
    <div
      className={cs(styles.buttonsContainer, {
        [styles.buttonsContainerAlone]: step === 1,
      })}
    >
      {step > 1 && (
        <Button
          onClick={() => setStep(step - 1)}
          variant='outline'
          size={isMobile ? 'sm' : 'md'}
        >
          Anterior
        </Button>
      )}
      <div className={styles.mobileHelper}></div>
      {step < totalSteps && (
        <Button onClick={() => setStep(step + 1)} size={isMobile ? 'sm' : 'md'}>
          Siguiente
        </Button>
      )}
      <div className={styles.mobileHelper}></div>
      {step === totalSteps && (
        <Button
          size={isMobile ? 'sm' : 'md'}
          onClick={() => {
            setAssistModalOpen(false);
            setStep(1);
          }}
        >
          Finalizar
        </Button>
      )}
    </div>
  );
}
