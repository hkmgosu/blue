import { FC, Suspense } from 'react';
import styled from 'styled-components';
import { Row, Col } from '@bx-design/react-grid';

import RegisterFormSubmit from './form-submit';
import RegisterFormName from './form-name';
import RegisterFormLastname from './form-lastname';
import RegisterFormEmail from './form-email';
import RegisterFormConfirmEmail from './form-confirm-email';
import RegisterFormPassword from './form-password';
import RegisterFormConfirmPassword from './form-confirm-password';
import RegisterSubmit from './submit';
import RegisterSuccessModal from './success-modal';

const RegisterForm: FC = () => {
  return (
    <RegisterFormSubmit>
      <Row className='items-center justify-around lg:mb-6'>
        <Col col='12' lg='5' className='mb-4 lg:mb-0'>
          <Suspense fallback={<div />}>
            <RegisterFormName />
          </Suspense>
        </Col>
        <Col col='12' lg='5' className='mb-4 lg:mb-0'>
          <Suspense fallback={<div />}>
            <RegisterFormLastname />
          </Suspense>
        </Col>
      </Row>

      <Row className='items-center justify-around lg:mb-6'>
        <Col col='12' lg='5' className='mb-4 lg:mb-0'>
          <Suspense fallback={<div />}>
            <RegisterFormEmail />
          </Suspense>
        </Col>
        <Col col='12' lg='5' className='mb-4 lg:mb-0'>
          <Suspense fallback={<div />}>
            <RegisterFormConfirmEmail />
          </Suspense>
        </Col>
      </Row>

      <Row className='justify-around lg:mb-6'>
        <Col col='12' lg='5' className='mb-4 lg:mb-0'>
          <Suspense fallback={<div />}>
            <RegisterFormPassword />
          </Suspense>
        </Col>
        <Col col='12' lg='5' className='mb-4 lg:mb-0'>
          <Suspense fallback={<div />}>
            <RegisterFormConfirmPassword />
          </Suspense>
        </Col>
      </Row>

      <Row className='items-center justify-around lg:mb-6'>
        <Col col='12' lg='5' className='mb-4 lg:mb-0'>
          <Required>( * ) Campo obligatorio</Required>
        </Col>
        <Col col='12' lg='5' />
      </Row>

      <Row className='justify-center items-center'>
        <Col col='12' lg='3'>
          <Suspense fallback={<div />}>
            <RegisterSubmit />
          </Suspense>
        </Col>
      </Row>
      <Suspense fallback={<div />}>
        <RegisterSuccessModal />
      </Suspense>
    </RegisterFormSubmit>
  );
};

const Required = styled.p`
  margin: 0;
  font-size: 10px;
  @media (min-width: 1200px) {
    font-size: 0.875rem;
  }
`;

export default RegisterForm;
