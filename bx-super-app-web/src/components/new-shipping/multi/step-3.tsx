import { Col, Row } from '@bx-design/react-grid';

import NewShippingLayoutStep from 'components/new-shipping/layout/step/step';
import NewShippingLayoutSummaryMulti from 'components/new-shipping/layout/summary/multi';
import NewShippingMultiAssistedCheckout from './assisted/checkout';

function NewShippingMultiStep3(): JSX.Element {
  return (
    <NewShippingLayoutStep>
      <NewShippingMultiAssistedCheckout />
      <Col col='12'>
        <Row className='xl:justify-center'>
          <Col col='12' xl='11'>
            <NewShippingLayoutSummaryMulti />
          </Col>
        </Row>
      </Col>
    </NewShippingLayoutStep>
  );
}

export default NewShippingMultiStep3;
