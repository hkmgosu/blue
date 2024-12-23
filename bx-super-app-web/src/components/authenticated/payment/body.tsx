import { FC } from 'react';
import styled from 'styled-components';

import PaymentTitle from './title';
import ShipmentResume from './shipment-resume';
import PaymentDetail from './payment-detail';
import { Card, CardBody } from 'components/ui-bx/card';
import { PaymentResponseType } from 'types/payment';

type Props = {
  data: PaymentResponseType;
  transactionId: string;
};

const PaymentBody: FC<Props> = ({ data, transactionId }) => (
  <Main role='main'>
    <Card>
      <CardBody key={transactionId}>
        <PaymentTitle data={data} />
        <ShipmentResume data={data} transactionId={transactionId} />
        <PaymentDetail data={data} transactionId={transactionId} />
      </CardBody>
    </Card>
  </Main>
);

const Main = styled.main`
  background-color: var(--bx-color-lblue-day);
  display: flex;
  flex-direction: column;
  @media (min-width: 1200px) {
    padding: 40px 108px;
  }
`;
export default PaymentBody;
