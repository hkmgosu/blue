import {
  getShippingPath,
  getShippingStep,
  shippingPaths,
  TShippingPaths,
} from 'config';
import { useStep } from 'emission-lib/hooks/emission-state';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useShippingType } from 'atoms/shipments';

export function useStepPathControl(type: TShippingPaths, view?: string): void {
  const [step, setStep] = useStep();
  const history = useHistory();

  const [, setType] = useShippingType();

  // Comparte el tipo de envío
  useEffect(() => {
    setType(type);
  }, [type, setType]);

  useEffect(() => {
    const position = getShippingStep(type, view);
    if (!position) return;
    if (getShippingPath(type, position) === view) return;
    setStep(position);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view, setStep]);

  useEffect(() => {
    let nextView = getShippingPath(type, step);
    if (nextView !== view) {
      // console.log({ type, step });

      if (type === 'multi' && step === 2) {
      }

      history.push(shippingPaths[type].default.replace(/:[^/]+/, nextView));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, view]);
}
