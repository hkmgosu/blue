import { isAssistedShippingMassiveAtom } from 'atoms/commons';
import { useAtom } from 'jotai';
import step1 from 'images/assisted-shipping/massive-1.png';
import step2 from 'images/assisted-shipping/massive-2.png';
import step3 from 'images/assisted-shipping/massive-3.png';
import { useState, useEffect } from 'react';
import { useStep } from 'emission-lib/hooks/emission-state';
import { texts } from './texts';
import ModalContent from '../ModalContent';
import styles from '../index.module.scss';
import Fade from 'components/ui-bx/utils/fade';

function NewShippingMassiveAssistedFileLoad(): JSX.Element {
  const [assistedShipping] = useAtom(isAssistedShippingMassiveAtom);
  const [assistModalOpen, setAssistModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [shippingStep] = useStep();
  const images = [
    <Fade in appear unmountOnExit>
      <img src={step1} alt={'Step 1'} className={styles.img} />
    </Fade>,
    <Fade in appear unmountOnExit>
      <img src={step2} alt={'Step 2'} className={styles.img} />
    </Fade>,
    <Fade in appear unmountOnExit>
      <img src={step3} alt={'Step 3'} className={styles.img} />
    </Fade>,
  ];
  useEffect(() => {
    if (assistedShipping) {
      setAssistModalOpen(true);
    }
  }, [assistedShipping]);

  return (
    <ModalContent
      isOpen={assistModalOpen && shippingStep === 2}
      texts={texts}
      imagesList={images}
      step={step}
      setStep={setStep}
      totalSteps={3}
      assistModalOpen={assistModalOpen}
      setAssistModalOpen={setAssistModalOpen}
      imagesLeft={[1]}
    />
  );
}

export default NewShippingMassiveAssistedFileLoad;
