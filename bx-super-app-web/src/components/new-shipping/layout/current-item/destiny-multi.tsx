import { Row, Col } from '@bx-design/react-grid';

import NewShippingFormDestinySelectAddress from 'components/new-shipping/form/destiny/select-address';

function NewShippingLayoutCurrentItemDestinyMulti(): JSX.Element {
  return (
    <Col xl='12'>
      <Row gX='5' className='justify-center mb-6 xl:mb-6'>
        <Col col='12' xl='12' className='mb-6 xl:mb-0'>
          <NewShippingFormDestinySelectAddress />
        </Col>
      </Row>
    </Col>
  );
}

export default NewShippingLayoutCurrentItemDestinyMulti;
