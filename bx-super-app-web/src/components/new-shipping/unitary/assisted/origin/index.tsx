import { isAssistedShippingAtom } from 'atoms/commons';
import { useAtom } from 'jotai';
import step1 from 'images/assisted-shipping/unitary-1.png';
import step2 from 'images/assisted-shipping/unitary-2.png';
import { useState, useEffect } from 'react';
import ModalContent from '../ModalContent';
import styles from '../index.module.scss';
import { texts } from './texts';
import { useStep } from 'emission-lib/hooks/emission-state';
import Fade from 'components/ui-bx/utils/fade';
function NewShippingUnitaryAssistedOrigin(): JSX.Element {
  const [step, setStep] = useState(1);
  const [assistModalOpen, setAssistModalOpen] = useState(false);
  const [assistedShipping] = useAtom(isAssistedShippingAtom);
  const [shippingStep] = useStep();
  const images = [
    <Fade in appear unmountOnExit>
      <img src={step1} alt={'Step 1'} className={styles.img} />
    </Fade>,
    <Fade in appear unmountOnExit>
      <img src={step2} alt={'Step 2'} className={styles.img} />
    </Fade>,
  ];
  useEffect(() => {
    if (assistedShipping) {
      setAssistModalOpen(true);
    }
  }, [assistedShipping]);

  return (
    <ModalContent
      isOpen={assistModalOpen && shippingStep === 1}
      texts={texts}
      imagesList={images}
      step={step}
      setStep={setStep}
      totalSteps={2}
      assistModalOpen={assistModalOpen}
      setAssistModalOpen={setAssistModalOpen}
      imagesLeft={[1]}
      imagesSmall={[1]}
    />
  );
}

export default NewShippingUnitaryAssistedOrigin;
