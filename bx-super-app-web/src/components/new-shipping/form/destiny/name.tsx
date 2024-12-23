import { useCallback, ChangeEvent, useEffect } from 'react';

import styles from 'components/new-shipping/form/destiny/destiny-name.module.css';
import { Input, Label, Feedback } from 'components/ui-bx/forms';
import { useYupValidate } from 'hooks/validation/use-yup-validate';
import { receiverNameSchema } from 'utils/validations/new-shipping/basic/receiver-name.validation';
import { useShippingReceiverName } from 'emission-lib/hooks/shipping';
import { useAtom } from 'jotai';
import { shipmentTypeAtom } from 'atoms/shipments/index';

function NewShippingFormDestinyName(): JSX.Element {
  const [receiver, setReceiver] = useShippingReceiverName();
  const { isValid, error } = useYupValidate(receiverNameSchema, {
    name: receiver,
  });
  const [typeShipping] = useAtom(shipmentTypeAtom);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      setReceiver(e.target.value);
      if (typeShipping === 'unitary') {
        window.localStorage.setItem('name-destiny-form', e.target.value);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setReceiver]
  );

  useEffect(() => {
    if (typeShipping === 'unitary') {
      setReceiver(window.localStorage.getItem('name-destiny-form') || receiver);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Label htmlFor='receiver-name'>
        Nombre<span className={styles.required}>*</span>
      </Label>
      <Input
        type='text'
        name='receiver-name'
        id='receiver-name'
        value={receiver}
        onChange={handleChange}
        placeholder='Nombre'
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

export default NewShippingFormDestinyName;
