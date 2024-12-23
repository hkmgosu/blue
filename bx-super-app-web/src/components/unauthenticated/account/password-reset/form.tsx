import { FC } from 'react';
import { Row, Col } from '@bx-design/react-grid';
import { useAtom } from 'jotai';

import {
  passwordResetEmailAtom,
  passwordResetEmailIsValidAtom,
  passwordResetIsLoadingAtom,
} from 'atoms/password-reset';
import PasswordResetFormSubmit from './form-submit';
import { Input, Label, Feedback } from 'components/ui-bx/forms';
import { Button } from 'components/ui-bx/button';

const PasswordResetForm: FC = () => {
  const [email, setEmail] = useAtom(passwordResetEmailAtom);
  const [validate] = useAtom(passwordResetEmailIsValidAtom);
  const [isLoading] = useAtom(passwordResetIsLoadingAtom);

  return (
    <PasswordResetFormSubmit>
      <Row className='mb-6'>
        <Col col='12'>
          <Label htmlFor='email'>Ingresa tu correo</Label>
          <Input
            type='email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='ejemplo@gmail.com'
          />
          {validate.isValid === false && (
            <Feedback type='invalid' isActive={validate.isValid === false}>
              {validate.error}
            </Feedback>
          )}
        </Col>
      </Row>
      <Row>
        <Col col='12'>
          <Button
            type='submit'
            fullWidth
            disabled={!validate.isValid}
            isLoading={isLoading}
          >
            Recuperar contraseña
          </Button>
        </Col>
      </Row>
    </PasswordResetFormSubmit>
  );
};

export default PasswordResetForm;
