import { useCallback, ChangeEvent, useEffect } from 'react';

import styles from 'components/new-shipping/form/destiny/destiny-email.module.css';
import { Input, Label, Feedback } from 'components/ui-bx/forms';
import { useYupValidate } from 'hooks/validation/use-yup-validate';
import { receiverEmailSchema } from 'utils/validations/new-shipping/basic/receiver-email.validation';
import { useShippingReceiverEmail } from 'emission-lib/hooks/shipping';
import { useAtom } from 'jotai';
import { shipmentTypeAtom } from 'atoms/shipments/index';

function NewShippingFormDestinyEmail(): JSX.Element {
  const [receiver, setReceiver] = useShippingReceiverEmail();
  const { isValid, error } = useYupValidate(receiverEmailSchema, {
    email: receiver,
  });
  const [typeShipping] = useAtom(shipmentTypeAtom);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      setReceiver(e.target.value);
      if (typeShipping === 'unitary') {
        window.localStorage.setItem('email-destiny-form', e.target.value);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setReceiver]
  );
  useEffect(() => {
    if (typeShipping === 'unitary') {
      setReceiver(
        window.localStorage.getItem('email-destiny-form') || receiver
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Label htmlFor='receiver-email'>
        Correo electrónico<span className={styles.required}>*</span>
      </Label>
      <Input
        type='email'
        name='receiver-email'
        id='receiver-email'
        value={receiver}
        onChange={handleChange}
        placeholder='ejemplo@mail.com'
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

export default NewShippingFormDestinyEmail;
