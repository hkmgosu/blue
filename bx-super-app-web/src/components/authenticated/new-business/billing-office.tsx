import { useAtom } from 'jotai';
import { Col } from '@bx-design/react-grid';

import { Input, Label } from 'components/ui-bx/forms';
import { newBusinessBillingOfficeAtom } from 'atoms/new-business';

function NewBusinessBillingOffice(): JSX.Element {
  const [office, setOffice] = useAtom(newBusinessBillingOfficeAtom);
  return (
    <Col col='12'>
      <Label htmlFor='pyme-phone'>Oficina</Label>
      <Input
        type='text'
        name='pyme-depto'
        onChange={(e) => setOffice(e.target.value)}
        value={office}
        placeholder='2-B'
      />
    </Col>
  );
}

export default NewBusinessBillingOffice;
