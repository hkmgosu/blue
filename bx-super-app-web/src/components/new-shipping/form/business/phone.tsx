import { useCallback, ChangeEvent } from 'react';

import styles from 'components/new-shipping/form/business/styles.module.css';
import { Input, Label, Feedback } from 'components/ui-bx/forms';
import { useYupValidate } from 'hooks/validation/use-yup-validate';
import { businessPhoneSchema } from 'utils/validations/new-shipping/basic/business-phone.validation';
import { useEmitterPymePhone } from 'emission-lib/hooks/emitter';
import { useEffect } from 'react';

function NewShippingFormBusinessPhone(): JSX.Element {
  const [phone, setPhone] = useEmitterPymePhone();
  const { isValid, error } = useYupValidate(businessPhoneSchema, { phone });

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      setPhone(e.target.value);
      window.localStorage.setItem('phone-emitter-form', e.target.value);
    },
    [setPhone]
  );

  useEffect(() => {
    setPhone(window.localStorage.getItem('phone-emitter-form') || phone);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Label htmlFor='business-phone'>
        Teléfono móvil<span className={styles.required}>*</span>
      </Label>
      <Input
        type='tel'
        name='business-phone'
        id='business-phone'
        value={phone}
        data-testid='business-phone'
        onChange={handleChange}
        placeholder='9 2244 7798'
        error={isValid === false}
      />
      {isValid === false && (
        <Feedback type='invalid' isActive={isValid === false}>
          {error}
        </Feedback>
      )}
    </>
  );
}

export default NewShippingFormBusinessPhone;
