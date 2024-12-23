import { useCallback, ChangeEvent } from 'react';

import styles from 'components/new-shipping/form/business/styles.module.css';
import { Input, Label, Feedback } from 'components/ui-bx/forms';
import { useYupValidate } from 'hooks/validation/use-yup-validate';
import { businessEmailSchema } from 'utils/validations/new-shipping/basic/business-email.validation';
import { useEmitterPymeEmail } from 'emission-lib/hooks/emitter';
import { useEffect } from 'react';

function NewShippingFormBusinessEmail(): JSX.Element {
  const [email, setEmail] = useEmitterPymeEmail();
  const { isValid, error } = useYupValidate(businessEmailSchema, { email });

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      setEmail(e.target.value);
      window.localStorage.setItem('email-emitter-form', e.target.value);
    },
    [setEmail]
  );

  useEffect(() => {
    setEmail(window.localStorage.getItem('email-emitter-form') || email);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Label htmlFor='business-email'>
        Correo electrónico<span className={styles.required}>*</span>
      </Label>
      <Input
        type='email'
        name='business-email'
        id='business-email'
        value={email}
        onChange={handleChange}
        placeholder='empresa@gmail.com'
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

export default NewShippingFormBusinessEmail;
