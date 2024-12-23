import styles from './nav.module.css';
import { useMemo } from 'react';
import { Card } from 'components/ui-bx/card';
import NewShippingLayoutSteper from 'components/new-shipping/layout/step/stepper';
import { useStep } from 'emission-lib/hooks/emission-state';
import { Step } from 'components/new-shipping/layout/step/stepper';

function NewShippingMassiveNav(): JSX.Element {
  const [step] = useStep();

  const steps = useMemo<Step[]>(
    () => [
      {
        step: '1',
        text: 'Quién envía',
        isActive: step >= 1,
        slotRight: (
          <div className={styles.cardRight}>
            <Card>
              <div className={styles.cardRightContent}>
                <div>Hasta</div>
                <h4>
                  <strong>50</strong>
                </h4>
                <div>envíos</div>
              </div>
            </Card>
          </div>
        ),
      },
      {
        step: '2',
        text: 'Carga masiva',
        isActive: step >= 2,
      },
      {
        step: '3',
        text: 'Confirmación datos',
        isActive: step >= 3,
      },
      {
        step: '4',
        text: 'Pago',
        isActive: step >= 4,
      },
    ],
    [step]
  );

  const currentStep = steps[step - 1];

  return (
    <NewShippingLayoutSteper
      steps={steps}
      slotLeft={currentStep?.slotLeft}
      slotRight={currentStep?.slotRight}
    />
  );
}

export default NewShippingMassiveNav;
