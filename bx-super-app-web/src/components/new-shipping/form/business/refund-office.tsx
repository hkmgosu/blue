import { useCallback, ChangeEvent, useEffect } from 'react';

import { Input, Label, Feedback } from 'components/ui-bx/forms';
import { useYupValidate } from 'hooks/validation/use-yup-validate';
import { businessRefundOfficeSchema } from 'utils/validations/new-shipping/basic/business-refund.validation';
import { useRefundOffice } from 'emission-lib/hooks/refund';

function NewShippingFormBusinessRefundOffice(): JSX.Element {
  const [office, setOffice] = useRefundOffice();
  const { isValid, error } = useYupValidate(businessRefundOfficeSchema, {
    office,
  });

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      setOffice(e.target.value);
      window.localStorage.setItem('office-emitter-form', e.target.value);
    },
    [setOffice]
  );

  useEffect(() => {
    setOffice(window.localStorage.getItem('office-emitter-form') || office);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Label htmlFor='business-refund-office'>Oficina</Label>
      <Input
        type='text'
        name='business-refund-office'
        id='business-refund-office'
        value={office}
        onChange={handleChange}
        placeholder='Ej: 301C'
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

export default NewShippingFormBusinessRefundOffice;
