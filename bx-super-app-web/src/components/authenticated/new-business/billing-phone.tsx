import { useAtom } from 'jotai';
import { Col } from '@bx-design/react-grid';
import styles from './content.module.scss';
import { Input, Label } from 'components/ui-bx/forms';
import { newBusinessBillingPhoneAtom } from 'atoms/new-business';

function NewBusinessBillingPhone(): JSX.Element {
  const [phone, setPhone] = useAtom(newBusinessBillingPhoneAtom);
  return (
    <Col col='12' md='6'>
      <Label htmlFor='pyme-phone'>
        Teléfono móvil <span className={styles.required}>*</span>
      </Label>
      <Input
        type='text'
        name='pyme-phone'
        onChange={(e) => setPhone(e.target.value)}
        value={phone}
        placeholder='+569 88668800'
      />
    </Col>
  );
}

export default NewBusinessBillingPhone;
