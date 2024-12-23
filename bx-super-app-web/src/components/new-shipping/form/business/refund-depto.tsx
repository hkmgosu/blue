import { useCallback, ChangeEvent } from 'react';

import { Input, Label, Feedback } from 'components/ui-bx/forms';
import { useYupValidate } from 'hooks/validation/use-yup-validate';
import { businessRefundDeptoSchema } from 'utils/validations/new-shipping/basic/business-refund.validation';
import { useRefundDepto } from 'emission-lib/hooks/refund';
import { useEffect } from 'react';

function NewShippingFormBusinessRefundDepto(): JSX.Element {
  const [depto, setDepto] = useRefundDepto();
  const { isValid, error } = useYupValidate(businessRefundDeptoSchema, {
    depto,
  });

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      setDepto(e.target.value);
      window.localStorage.setItem('depto-emitter-form', e.target.value);
    },
    [setDepto]
  );

  useEffect(() => {
    setDepto(window.localStorage.getItem('depto-emitter-form') || depto);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Label htmlFor='business-refund-depto'>Depto</Label>
      <Input
        type='text'
        name='business-refund-depto'
        id='business-refund-depto'
        value={depto}
        onChange={handleChange}
        placeholder='Ej: Torre A 301'
        error={isValid === false}
        maxLength={40}
      />
      {isValid === false && (
        <Feedback type='invalid' isActive={isValid === false}>
          {error}
        </Feedback>
      )}
    </>
  );
}

export default NewShippingFormBusinessRefundDepto;
