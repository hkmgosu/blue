import { useCallback, ChangeEvent } from 'react';

import { Input, Label, Feedback } from 'components/ui-bx/forms';
import { useYupValidate } from 'hooks/validation/use-yup-validate';
import { receiverDestinyComplementSchema } from 'utils/validations/new-shipping/basic/receiver-destiny-complement.validation';
import { useShippingDestinyAddressComplement } from 'emission-lib/hooks/shipping-destiny';

function NewShippingFormDestinyComplement(): JSX.Element {
  const [complement, setComplement] = useShippingDestinyAddressComplement();
  const { isValid, error } = useYupValidate(receiverDestinyComplementSchema, {
    complement,
  });

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      setComplement(e.target.value);
    },
    [setComplement]
  );

  return (
    <>
      <Label htmlFor='receiver-destiny-complement'>Depto / Oficina</Label>
      <Input
        type='text'
        name='receiver-destiny-complement'
        id='receiver-destiny-complement'
        value={complement}
        onChange={handleChange}
        placeholder='Ej: Torre A 301'
        error={isValid === false}
        maxLength={20}
      />
      {isValid === false && (
        <Feedback type='invalid' isActive={isValid === false}>
          {error}
        </Feedback>
      )}
    </>
  );
}

export default NewShippingFormDestinyComplement;
