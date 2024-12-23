import { Col, Row } from '@bx-design/react-grid';

import NewShippingLayoutStep from 'components/new-shipping/layout/step/step';
import NewShippingLayoutSummaryUnitary from 'components/new-shipping/layout/summary/summary-unitary';
import NewShippingUnitaryAssistedCheckout from './assisted/checkout';

function NewShippingUnitaryStep3(): JSX.Element {
  return (
    <NewShippingLayoutStep>
      <NewShippingUnitaryAssistedCheckout />
      <Col col='12'>
        <Row className='xl:justify-center'>
          <Col col='12' xl='12'>
            <NewShippingLayoutSummaryUnitary />
          </Col>
        </Row>
      </Col>
    </NewShippingLayoutStep>
  );
}

export default NewShippingUnitaryStep3;
