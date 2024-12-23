import { Col, Container, Row } from '@bx-design/react-grid';
import CancelOrderServiceComponent from 'components/authenticated/shipments/cancel-order-service';
import { Page } from 'components/layout';
import AuthenticatedLayout from 'components/layout/authenticated-layout';
import { Card, CardBody } from 'components/ui-bx/card';
import { Provider } from 'jotai';
import { FC } from 'react';
import styled from 'styled-components';

const CancelOrderServicePage: FC = () => {
  return (
    <Provider>
      <Page title='Anulaciones | BlueEnvío by BlueExpress'>
        <AuthenticatedLayout>
          <Main>
            <Container fluid>
              <Row className='items-center justify-center'>
                <Card>
                  <CardBody>
                    <Col col='12'>
                      <Title>Anulación de envío</Title>
                      <CancelOrderServiceComponent />
                    </Col>
                  </CardBody>
                </Card>
              </Row>
            </Container>
          </Main>
        </AuthenticatedLayout>
      </Page>
    </Provider>
  );
};

const Main = styled.main`
  padding: 56px 51px;
  background-color: var(--bx-color-lblue-day);
  min-height: calc(100vh - 120px);
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 21px;
  margin-bottom: 24px;
`;

export default CancelOrderServicePage;
