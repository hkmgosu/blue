import { useAtom } from 'jotai';
import { Col } from '@bx-design/react-grid';

import { Input, Label } from 'components/ui-bx/forms';
import {
  isBillingEditableAtom,
  pymeBillingAddressDepartmentAtom,
} from 'atoms/pyme-billing-info';
import { useEffect } from 'react';
import { usePyme } from 'contexts/pyme/pyme-context';

function PymeAddressDepto(): JSX.Element {
  const [depto, setDepto] = useAtom(pymeBillingAddressDepartmentAtom);
  const [isEditable] = useAtom(isBillingEditableAtom);
  const { defaultPyme } = usePyme();
  useEffect(() => {
    if (defaultPyme) {
      setDepto(defaultPyme?.billing_information?.department || '');
    }
  }, [defaultPyme, setDepto]);
  return (
    <Col col='12' lg='6'>
      <Label htmlFor='pyme-email'>Departamento</Label>
      <Input
        type='text'
        name='pyme-email'
        onChange={(e) => setDepto(e.target.value)}
        value={depto}
        disabled={!isEditable}
      />
    </Col>
  );
}

export default PymeAddressDepto;
