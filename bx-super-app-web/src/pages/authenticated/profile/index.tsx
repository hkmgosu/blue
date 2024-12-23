import { FC } from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from '@bx-design/react-grid';

import { PaymentProvider } from 'contexts/payment-context';
import { Page } from 'components/layout';
import AuthenticatedLayout from 'components/layout/authenticated-layout';
import UserForm from 'components/authenticated/account/user-form';
import CreditCardSectioon from 'components/authenticated/account/credit-card';
import MyBusinessSection from 'components/authenticated/account/my-business';
import AvatarModal from 'components/unauthenticated/account/register/avatar-modal';

const Profile: FC = () => (
  <Page title='Mi cuenta' description='Detalle de mi cuenta.'>
    <AuthenticatedLayout>
      <Main>
        <Container>
          <Row>
            <Col col='12'>
              <TitlePage>Mi cuenta</TitlePage>
            </Col>
          </Row>
          <Row className='justify-center'>
            <Col col='12' lg='6'>
              <Row>
                <Col col='12'>
                  <UserForm />
                </Col>
              </Row>
            </Col>
            <Col col='12' lg='6'>
              <Row>
                <Col col='12'>
                  <MyBusinessSection />
                </Col>
                <Col col='12'>
                  <PaymentProvider>
                    <CreditCardSectioon />
                  </PaymentProvider>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Main>
    </AuthenticatedLayout>
    <AvatarModal />
  </Page>
);

const Main = styled.main`
  background-color: var(--bx-color-lblue-day);
  display: flex;
  padding: 20px;
`;

const TitlePage = styled.h6`
  font-family: var(--bx-font-primary);
  font-style: normal;
  font-weight: 900;
  font-size: 22px;
  line-height: 28px;
  text-align: center;
  margin-bottom: 40px;
`;

export default Profile;
