import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { Col } from '@bx-design/react-grid';

import { Feedback, Input, Label } from 'components/ui-bx/forms';
import { PymeType } from 'types/auth';
import { useYupValidate } from 'hooks/validation/use-yup-validate';
import { pymeAddressNumber } from 'utils/validations/pyme-form';
import { addressNumberAtom } from 'atoms/pyme-billing-info';

type Props = {
  userMemorized: PymeType;
};

function PymeFormAddressNumber({ userMemorized }: Props): JSX.Element {
  const [address, setStreetName] = useAtom(addressNumberAtom);
  const { isValid, error } = useYupValidate(pymeAddressNumber, {
    address_number: address,
  });

  useEffect(() => {
    setStreetName(userMemorized.billing_information.address_number || '');
  }, [setStreetName, userMemorized.billing_information.address_number]);

  return (
    <Col col='12' md='6'>
      <Label htmlFor='pyme-address-number'>Numeracion*</Label>
      <Input
        type='text'
        name='pyme-address-number'
        onChange={(e) => setStreetName(e.target.value)}
        value={address}
      />
      {isValid && (
        <Feedback type={'invalid'} isActive>
          {error}
        </Feedback>
      )}
    </Col>
  );
}

export default PymeFormAddressNumber;
