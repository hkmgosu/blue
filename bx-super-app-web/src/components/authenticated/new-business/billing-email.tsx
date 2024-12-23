import { useAtom } from 'jotai';
import { Col } from '@bx-design/react-grid';
import styles from './content.module.scss';
import { Input, Label } from 'components/ui-bx/forms';

import { newBusinessBillingEmailAtom } from 'atoms/new-business';

function NewBusinessBillingEmail(): JSX.Element {
  const [email, setEmail] = useAtom(newBusinessBillingEmailAtom);
  return (
    <Col col='12'>
      <Label htmlFor='pyme-email'>
        Correo electrónico <span className={styles.required}>*</span>
      </Label>
      <Input
        type='text'
        name='pyme-email'
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        placeholder='correo@ejemplo.com'
      />
    </Col>
  );
}

export default NewBusinessBillingEmail;
