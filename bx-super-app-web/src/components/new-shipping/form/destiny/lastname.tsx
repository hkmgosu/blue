import { useCallback, ChangeEvent, useEffect } from 'react';

import styles from 'components/new-shipping/form/destiny/destiny-lastname.module.css';
import { Input, Label, Feedback } from 'components/ui-bx/forms';
import { useYupValidate } from 'hooks/validation/use-yup-validate';
import { receiverLastNameSchema } from 'utils/validations/new-shipping/basic/receiver-lastname.validation';
import { useShippingReceiverLastname } from 'emission-lib/hooks/shipping';
import { useAtom } from 'jotai';
import { shipmentTypeAtom } from 'atoms/shipments/index';

function NewShippingFormDestinyLastName(): JSX.Element {
  const [receiver, setReceiver] = useShippingReceiverLastname();
  const { isValid, error } = useYupValidate(receiverLastNameSchema, {
    lastName: receiver,
  });
  const [typeShipping] = useAtom(shipmentTypeAtom);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      setReceiver(e.target.value);
      if (typeShipping === 'unitary') {
        window.localStorage.setItem('lastname-destiny-form', e.target.value);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setReceiver]
  );

  useEffect(() => {
    if (typeShipping === 'unitary') {
      setReceiver(
        window.localStorage.getItem('lastname-destiny-form') || receiver
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Label htmlFor='receiver-lastName'>
        Apellido<span className={styles.required}>*</span>
      </Label>
      <Input
        type='text'
        name='receiver-lastName'
        id='receiver-lastName'
        value={receiver}
        onChange={handleChange}
        placeholder='Apellido'
        error={isValid === false}
        maxLength={30}
      />
      {isValid === false && (
        <Feedback type='invalid' isActive={isValid === false}>
          {error}
        </Feedback>
      )}
    </>
  );
}

export default NewShippingFormDestinyLastName;
