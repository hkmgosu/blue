import { FC } from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from '@bx-design/react-grid';

import Page from 'components/layout/page';
import AuthenticatedLayout from 'components/layout/authenticated-layout';
import PymeBillingInfoForm from 'components/authenticated/pyme/pyme-billing-info-form';

const PymeBillingInfo: FC = () => (
  <Page title='Información de facturación'>
    <AuthenticatedLayout>
      <Main>
        <Container fluid>
          <Row>
            <Col col='12'>
              <PymeBillingInfoForm />
            </Col>
          </Row>
        </Container>
      </Main>
    </AuthenticatedLayout>
  </Page>
);

const Main = styled.main`
  min-height: 100%;
  padding: 30px 24px;
  background-color: var(--bx-color-lblue-day);
`;

export default PymeBillingInfo;
