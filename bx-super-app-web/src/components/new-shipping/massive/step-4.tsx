import { Col, Row } from '@bx-design/react-grid';

import NewShippingLayoutStep from 'components/new-shipping/layout/step/step';
import NewShippingLayoutSummaryMulti from 'components/new-shipping/layout/summary/multi';
import NewShippingMassiveAssistedCheckout from './assisted/checkout';

function NewShippingMassiveStep4(): JSX.Element {
  return (
    <NewShippingLayoutStep>
      <NewShippingMassiveAssistedCheckout />
      <Col col='12'>
        <Row className='xl:justify-center'>
          <Col col='12' xl='11'>
            <NewShippingLayoutSummaryMulti isMassive />
          </Col>
        </Row>
      </Col>
    </NewShippingLayoutStep>
  );
}

export default NewShippingMassiveStep4;
