import { useAtom } from 'jotai';
import { Col } from '@bx-design/react-grid';

import { Input, Label } from 'components/ui-bx/forms';
import { newBusinessBillingDeptoAtom } from 'atoms/new-business';

function NewBusinessBillingDepto(): JSX.Element {
  const [depto, setDepto] = useAtom(newBusinessBillingDeptoAtom);
  return (
    <Col col='12'>
      <Label htmlFor='pyme-phone'>Departamento</Label>
      <Input
        type='text'
        name='pyme-depto'
        onChange={(e) => setDepto(e.target.value)}
        value={depto}
        placeholder='1024'
      />
    </Col>
  );
}

export default NewBusinessBillingDepto;
