import { FC, Suspense } from 'react';
import styled from 'styled-components';
import { Row, Col } from '@bx-design/react-grid';

import LoginWithPasswordFormSubmit from './form-submit';
import LoginWithPasswordFormUsername from './form-username';
import LoginWithPasswordFormPassword from './form-password';
import LoginWithPasswordRecoverPassword from './recover-password';
import LoginWithPasswordSubmit from './submit';
import LoginWithPasswordRecoverRegister from './register';
import LoginWithPasswordRecoverGoBack from './go-back';

const LoginWithPasswordContent: FC = () => {
  return (
    <Content>
      <Row className='justify-center'>
        <Col col='12' xl='9' xxl='6'>
          <LoginWithPasswordFormSubmit>
            <Row className='mb-6'>
              <Col col='12' className='mb-4 xl:mb-6'>
                <Suspense fallback={<div />}>
                  <LoginWithPasswordFormUsername />
                </Suspense>
              </Col>
              <Col col='12' className='mb-4 xl:mb-6'>
                <Suspense fallback={<div />}>
                  <LoginWithPasswordFormPassword />
                </Suspense>
              </Col>
              <Col col='12'>
                <Suspense fallback={<div />}>
                  <LoginWithPasswordRecoverPassword />
                </Suspense>
              </Col>
            </Row>
            <Row className='mb-4 xl:mb-6'>
              <Col col='12'>
                <Suspense fallback={<div />}>
                  <LoginWithPasswordSubmit />
                </Suspense>
              </Col>
            </Row>
            <Row className='mb-4 xl:mb-6'>
              <Col col='12'>
                <Suspense fallback={<div />}>
                  <LoginWithPasswordRecoverRegister />
                </Suspense>
              </Col>
            </Row>
            <Row>
              <Col col='12'>
                <Suspense fallback={<div />}>
                  <LoginWithPasswordRecoverGoBack />
                </Suspense>
              </Col>
            </Row>
          </LoginWithPasswordFormSubmit>
        </Col>
      </Row>
    </Content>
  );
};

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 32px;
`;

export default LoginWithPasswordContent;
