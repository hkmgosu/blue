import { isAssistedShippingAtom } from 'atoms/commons';
import { useStep } from 'emission-lib/hooks/emission-state';
import step1 from 'images/assisted-shipping/unitary-10.png';
import step2 from 'images/assisted-shipping/unitary-11.png';
import step3 from 'images/assisted-shipping/unitary-12.png';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import ModalContent from '../ModalContent';
import { texts } from './texts';
import styles from '../index.module.scss';
import Fade from 'components/ui-bx/utils/fade';
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
export default function NewShippingUnitaryAssistedCheckout(): JSX.Element {
  const [step, setStep] = useState(1);
  const [assistModalOpen, setAssistModalOpen] = useState(false);
  const [assistedShipping] = useAtom(isAssistedShippingAtom);
  const [shippingStep] = useStep();
  useEffect(() => {
    if (assistedShipping) {
      setAssistModalOpen(true);
    }
  }, [assistedShipping]);
  return (
    <ModalContent
      isOpen={assistModalOpen && shippingStep === 3}
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
