import { FC } from 'react';
import { Row, Col } from '@bx-design/react-grid';

import PasswordChangeFormSubmit from './form-submit';
import PasswordChangeFormPassword from './form-password';
import PasswordChangeFormConfirmPassword from './form-confirm-password';
import PasswordChangePasswordSubmit from './submit';

const PasswordChangeForm: FC = () => {
  return (
    <PasswordChangeFormSubmit>
      <Row className='mb-4 xl:mb-6'>
        <Col col='12' xl='6' className='mb-2'>
          <PasswordChangeFormPassword />
        </Col>
        <Col col='12' xl='6'>
          <PasswordChangeFormConfirmPassword />
        </Col>
      </Row>
      <Row className='xl:justify-end'>
        <Col col='12' xl='6'>
          <PasswordChangePasswordSubmit />
        </Col>
      </Row>
    </PasswordChangeFormSubmit>
  );
};

export default PasswordChangeForm;
