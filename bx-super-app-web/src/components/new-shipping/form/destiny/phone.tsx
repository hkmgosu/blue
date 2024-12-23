import { useCallback, ChangeEvent, useEffect } from 'react';

import styles from 'components/new-shipping/form/destiny/destiny-phone.module.css';
import { Input, Label, Feedback } from 'components/ui-bx/forms';
import { useYupValidate } from 'hooks/validation/use-yup-validate';
import { receiverPhoneSchema } from 'utils/validations/new-shipping/basic/receiver-phone.validation';
import { useShippingReceiverPhone } from 'emission-lib/hooks/shipping';
import { shipmentTypeAtom } from 'atoms/shipments/index';
import { useAtom } from 'jotai';

function NewShippingFormDestinyPhone(): JSX.Element {
  const [receiver, setReceiver] = useShippingReceiverPhone();
  const { isValid, error } = useYupValidate(receiverPhoneSchema, {
    phone: receiver,
  });
  const [typeShipping] = useAtom(shipmentTypeAtom);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      setReceiver(e.target.value);
      if (typeShipping === 'unitary') {
        window.localStorage.setItem('phone-destiny-form', e.target.value);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setReceiver]
  );

  useEffect(() => {
    if (typeShipping === 'unitary') {
      setReceiver(
        window.localStorage.getItem('phone-destiny-form') || receiver
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Label htmlFor='receiver-phone'>
        Teléfono móvil<span className={styles.required}>*</span>
      </Label>
      <Input
        type='tel'
        name='receiver-phone'
        id='receiver-phone'
        value={receiver}
        onChange={handleChange}
        placeholder='Ej: +56 9 0000 000'
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

export default NewShippingFormDestinyPhone;
