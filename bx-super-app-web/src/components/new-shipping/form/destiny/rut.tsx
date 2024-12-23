import { useCallback, ChangeEvent, useEffect } from 'react';

import styles from 'components/new-shipping/form/destiny/destiny-rut.module.css';
import { Input, Label, Feedback } from 'components/ui-bx/forms';
import { useYupValidate } from 'hooks/validation/use-yup-validate';
import { receiverRutSchema } from 'utils/validations/new-shipping/basic/receiver-rut.validation';
import { useShippingReceiverRut } from 'emission-lib/hooks/shipping';
import { useAtom } from 'jotai';
import { shipmentTypeAtom } from 'atoms/shipments/index';

function NewShippingFormDestinyRut(): JSX.Element {
  const [receiver, setReceiver] = useShippingReceiverRut();
  const { isValid, error } = useYupValidate(receiverRutSchema, {
    rut: receiver,
  });
  const [typeShipping] = useAtom(shipmentTypeAtom);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      setReceiver(e.target.value);
      if (typeShipping === 'unitary') {
        window.localStorage.setItem('rut-destiny-form', e.target.value);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setReceiver]
  );
  useEffect(() => {
    if (typeShipping === 'unitary') {
      setReceiver(window.localStorage.getItem('rut-destiny-form') || receiver);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Label htmlFor='receiver-rut'>
        R.U.T<span className={styles.required}>*</span>
      </Label>
      <Input
        type='text'
        name='receiver-rut'
        id='receiver-rut'
        value={receiver}
        onChange={handleChange}
        placeholder='Ej: 16123456-7'
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

export default NewShippingFormDestinyRut;
