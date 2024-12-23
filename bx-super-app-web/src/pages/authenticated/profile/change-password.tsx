import { FC } from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from '@bx-design/react-grid';

import { Page } from 'components/layout';
import AuthenticatedLayout from 'components/layout/authenticated-layout';
import ChangePassword from 'components/authenticated/account/change-password-form';

const Profile: FC = () => (
  <Page title='Account' description='Account Detail'>
    <AuthenticatedLayout>
      <Main>
        <Container>
          <Row>
            <Col col='12'>
              <TitlePage>Mi cuenta</TitlePage>
            </Col>
          </Row>
          <Row className='justify-center'>
            <Col col='12'>
              <ChangePassword />
            </Col>
          </Row>
        </Container>
      </Main>
    </AuthenticatedLayout>
  </Page>
);

const Main = styled.main`
  background-color: var(--bx-color-blue-clear);
  display: flex;
  padding: 56px 20px;
  min-height: calc(100vh - 120px);
  overflow-y: auto;
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
