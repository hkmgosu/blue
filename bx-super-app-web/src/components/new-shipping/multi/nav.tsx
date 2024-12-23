import NewShippingLayoutSteper from 'components/new-shipping/layout/step/stepper';
import { useMemo } from 'react';
import { useStep } from 'emission-lib/hooks/emission-state';

function NewShippingMultiNav(): JSX.Element {
  const [step] = useStep();

  const steps = useMemo(
    () => [
      {
        step: '1',
        text: 'Origen',
        isActive: step >= 1,
      },
      {
        step: '2',
        text: 'Información de envío',
        isActive: step >= 2,
      },
      {
        step: '3',
        text: 'Pago',
        isActive: step >= 3,
      },
    ],
    [step]
  );

  return <NewShippingLayoutSteper steps={steps} />;
}

export default NewShippingMultiNav;
