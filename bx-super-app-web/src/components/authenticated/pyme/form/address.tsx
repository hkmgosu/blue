import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { Col } from '@bx-design/react-grid';

import { Feedback, Input, Label } from 'components/ui-bx/forms';
import { PymeType } from 'types/auth';
import { useYupValidate } from 'hooks/validation/use-yup-validate';
import { pymeAddress } from 'utils/validations/pyme-form';
import { addressAtom } from 'atoms/pyme-billing-info';

type Props = {
  userMemorized: PymeType;
};

function PymeFormAddress({ userMemorized }: Props): JSX.Element {
  const [address, setStreetName] = useAtom(addressAtom);
  const { isValid, error } = useYupValidate(pymeAddress, {
    address,
  });

  useEffect(() => {
    setStreetName(userMemorized.billing_information.address || '');
  }, [setStreetName, userMemorized.billing_information.address]);

  return (
    <Col col='12' md='6'>
      <Label htmlFor='pyme-address'>Nombre calle*</Label>
      <Input
        type='text'
        name='pyme-address'
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

export default PymeFormAddress;
