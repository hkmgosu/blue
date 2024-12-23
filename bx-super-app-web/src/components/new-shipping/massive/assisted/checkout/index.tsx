import { isAssistedShippingMassiveAtom } from 'atoms/commons';
import { useStep } from 'emission-lib/hooks/emission-state';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import ModalContent from '../ModalContent';
import { texts } from './texts';

import { shippingMultiCheckoutImages } from 'components/new-shipping/multi/assisted/checkout';

export default function NewShippingMassiveAssistedCheckout(): JSX.Element {
  const [step, setStep] = useState(1);
  const [assistModalOpen, setAssistModalOpen] = useState(false);
  const [assistedShipping] = useAtom(isAssistedShippingMassiveAtom);
  const [shippingStep] = useStep();
  useEffect(() => {
    if (assistedShipping) {
      setAssistModalOpen(true);
    }
  }, [assistedShipping]);
  return (
    <ModalContent
      isOpen={assistModalOpen && shippingStep === 4}
      texts={texts}
      imagesList={shippingMultiCheckoutImages}
      step={step}
      setStep={setStep}
      totalSteps={4}
      assistModalOpen={assistModalOpen}
      setAssistModalOpen={setAssistModalOpen}
      imagesLeft={[1, 2]}
    />
  );
}
