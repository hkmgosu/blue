import { useMemo } from 'react';

import { useStep } from 'emission-lib/hooks/emission-state';
import NewShippingLayoutSteper from '../layout/step/stepper';

function NewShippingUnitaryNav(): JSX.Element {
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

export default NewShippingUnitaryNav;
