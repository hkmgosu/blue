import { useCallback, useEffect } from 'react';

import { Button } from 'components/ui-bx/button';
import {
  useEmitterIsValid,
  useEmitterValidate,
} from 'emission-lib/hooks/emitter';
import { useErrorStep1, useStep } from 'emission-lib/hooks/emission-state';

function NewShippingFormBusinessNext(): JSX.Element {
  const isValid = useEmitterIsValid();
  useEmitterValidate();
  const [, setStep] = useStep();
  const [, setIsErrorValid] = useErrorStep1();

  const handleClick = useCallback(() => {
    if (isValid) {
      setStep(2);
      window.scrollTo({
        top: 0,
      });
    } else {
      setIsErrorValid(true);
    }
  }, [isValid, setStep, setIsErrorValid]);

  useEffect(() => {
    if (isValid) {
      setIsErrorValid(false);
    }
  }, [isValid, setIsErrorValid]);

  return (
    <Button fullWidth onClick={handleClick}>
      Siguiente
    </Button>
  );
}

export default NewShippingFormBusinessNext;
