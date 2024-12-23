import { useAtom } from 'jotai';
import { Col } from '@bx-design/react-grid';

import { Input, Label } from 'components/ui-bx/forms';

import {
  isBillingEditableAtom,
  pymeBillingAddressOfficeAtom,
} from 'atoms/pyme-billing-info';
import { useEffect } from 'react';
import { usePyme } from 'contexts/pyme/pyme-context';

function PymeAddressOffice(): JSX.Element {
  const [office, setOffice] = useAtom(pymeBillingAddressOfficeAtom);
  const [isEditable] = useAtom(isBillingEditableAtom);
  const { defaultPyme } = usePyme();
  useEffect(() => {
    if (defaultPyme) {
      setOffice(defaultPyme?.billing_information?.address_office || '');
    }
  }, [defaultPyme, setOffice]);
  return (
    <Col col='12' lg='6'>
      <Label htmlFor='pyme-email'>Oficina</Label>
      <Input
        type='text'
        name='pyme-email'
        onChange={(e) => setOffice(e.target.value)}
        value={office}
        disabled={!isEditable}
      />
    </Col>
  );
}

export default PymeAddressOffice;
