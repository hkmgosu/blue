import { Row, Col } from '@bx-design/react-grid';

import NewShippingLayoutStep from 'components/new-shipping/layout/step/step';
import NewShippingLayoutBusinessEmitter from 'components/new-shipping/layout/business/business-emitter';
import NewShippingLayoutBusinessAddress from 'components/new-shipping/layout/business/business-address';
import NewShippingLayoutBusinessNext from 'components/new-shipping/layout/business/business-next';
import NewShippingLayoutErrorStep1 from 'components/new-shipping/layout/error/step-1';
import NewShippingUnitaryAssistedOrigin from './assisted/origin';

function NewShippingUnitaryStep1(): JSX.Element {
  return (
    <>
      <NewShippingUnitaryAssistedOrigin />
      <NewShippingLayoutStep>
        <Col col='12' lg='4' className='mb-2 xl:mb-4'>
          <NewShippingLayoutBusinessEmitter />
        </Col>
        <Col col='12' lg='8' className='mb-2 xl:mb-4'>
          <NewShippingLayoutBusinessAddress />
        </Col>
        <Row className='items-center justify-center'>
          <Col col='6' lg='12'>
            <NewShippingLayoutErrorStep1 />
          </Col>
        </Row>
        <Col col='12' lg='12' className='mb-2 xl:mb-4'>
          <NewShippingLayoutBusinessNext />
        </Col>
      </NewShippingLayoutStep>
    </>
  );
}

export default NewShippingUnitaryStep1;
