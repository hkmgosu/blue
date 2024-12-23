import { useCallback, useEffect } from 'react';

import { Button } from 'components/ui-bx/button';
import {
  useEmissionDtoIsValid,
  useEmissionDtoValidate,
} from 'emission-lib/hooks/dto';
import { useErrorStep2 } from 'emission-lib/hooks/emission-state';

type Props = {
  handleChange: () => void;
  isMulti?: boolean;
};

function NewShippingFormShippingNext({
  handleChange,
  isMulti,
}: Props): JSX.Element {
  const isValid = useEmissionDtoIsValid();
  useEmissionDtoValidate();
  const [, setIsErrorValid] = useErrorStep2();
  useEffect(() => {
    if (isValid) {
      setIsErrorValid(false);
    }
  }, [isValid, setIsErrorValid]);

  const handleClick = useCallback(() => {
    if (isValid || isMulti) {
      handleChange();
    } else {
      setIsErrorValid(true);
    }
  }, [handleChange, isValid, setIsErrorValid, isMulti]);

  return (
    <Button fullWidth onClick={handleClick}>
      Siguiente
    </Button>
  );
}

export default NewShippingFormShippingNext;
