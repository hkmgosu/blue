import { Button } from 'components/ui-bx/button';
import {
  useShippingDestinyIsValid,
  useShippingDestinyValidate,
} from 'emission-lib/hooks/shipping-destiny';
import { useErrorStep2, useStep } from 'emission-lib/hooks/emission-state';

function NewShippingFormShippingNextInDestinyForm(): JSX.Element {
  useShippingDestinyValidate();
  const isValid = useShippingDestinyIsValid();
  const [, setIsErrorValid] = useErrorStep2();
  const [step, setStep] = useStep();

  const handleClick = (): void => {
    if (isValid) {
      window.scrollTo(0, 0);
      setStep(step + 1);
    } else {
      setIsErrorValid(true);
    }
  };

  return (
    <Button fullWidth onClick={handleClick}>
      Siguiente
    </Button>
  );
}

export default NewShippingFormShippingNextInDestinyForm;
