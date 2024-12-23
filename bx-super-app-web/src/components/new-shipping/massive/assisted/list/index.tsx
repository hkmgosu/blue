import { isAssistedShippingMassiveAtom } from 'atoms/commons';
import { useAtom } from 'jotai';
import { useState, useEffect } from 'react';
import { useStep } from 'emission-lib/hooks/emission-state';
import { texts } from './texts';
import ModalContent from '../ModalContent';
import { shippingListImages } from 'components/new-shipping/multi/assisted/list';

function NewShippingMassiveAssistedList(): JSX.Element {
  const [assistedShipping] = useAtom(isAssistedShippingMassiveAtom);
  const [assistModalOpen, setAssistModalOpen] = useState(false);
  const [step, setStep] = useState(1);
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
      imagesList={shippingListImages}
      step={step}
      setStep={setStep}
      totalSteps={6}
      assistModalOpen={assistModalOpen}
      setAssistModalOpen={setAssistModalOpen}
      imagesLeft={[1, 2, 3]}
    />
  );
}

export default NewShippingMassiveAssistedList;
