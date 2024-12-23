import { useCallback, ChangeEvent } from 'react';

import { Input, Label, Feedback } from 'components/ui-bx/forms';
import { useYupValidate } from 'hooks/validation/use-yup-validate';
import { receiverDestinyReferenceSchema } from 'utils/validations/new-shipping/basic/receiver-destiny-reference.validation';
import { useShippingDestinyAddressReference } from 'emission-lib/hooks/shipping-destiny';

function NewShippingFormDestinyReference(): JSX.Element {
  const [reference, setReference] = useShippingDestinyAddressReference();
  const { isValid, error } = useYupValidate(receiverDestinyReferenceSchema, {
    reference,
  });

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      setReference(e.target.value);
    },
    [setReference]
  );

  return (
    <>
      <Label htmlFor='receiver-destiny-reference'>Referencia de ayuda</Label>
      <Input
        type='text'
        name='receiver-destiny-reference'
        id='receiver-destiny-reference'
        value={reference}
        onChange={handleChange}
        placeholder='Ej: Entre calle totoral y calle Lautaro'
        error={isValid === false}
        maxLength={60}
      />
      {isValid === false && (
        <Feedback type='invalid' isActive={isValid === false}>
          {error}
        </Feedback>
      )}
    </>
  );
}

export default NewShippingFormDestinyReference;
