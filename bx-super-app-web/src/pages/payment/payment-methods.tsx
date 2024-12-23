import { FC } from 'react';
import { Page } from 'components/layout';
import styled from 'styled-components';

import AddPaymentMethods from 'components/payment/add-method';
import Cards from 'components/payment/cards';

const PaymentMethods: FC = () => (
  <Page>
    <Container>
      <AddPaymentMethods />
      <Cards />
    </Container>
  </Page>
);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 32px;
`;

export default PaymentMethods;
