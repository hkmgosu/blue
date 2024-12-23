import { Row, Col } from '@bx-design/react-grid';

import NewShippingLayoutStep from 'components/new-shipping/layout/step/step';
import NewShippingLayoutBusinessEmitter from 'components/new-shipping/layout/business/business-emitter';
import NewShippingLayoutBusinessAddress from 'components/new-shipping/layout/business/business-address';
import NewShippingLayoutBusinessNext from 'components/new-shipping/layout/business/business-next';
import NewShippingLayoutErrorStep1 from 'components/new-shipping/layout/error/step-1';
import NewShippingMultiAssistedOrigin from './assisted/origin';

function NewShippingMultiStep1(): JSX.Element {
  return (
    <NewShippingLayoutStep>
      <NewShippingMultiAssistedOrigin />
      <Col col='12' lg='4' className='mb-2 xl:mb-12'>
        <NewShippingLayoutBusinessEmitter />
      </Col>
      <Col col='12' lg='8' className='mb-2 xl:mb-12'>
        <NewShippingLayoutBusinessAddress />
      </Col>
      <Col col='12'>
        <NewShippingLayoutBusinessNext />
      </Col>
      <Col col='12'>
        <Row>
          <Col col='12' lg='6' className='ml-[50%]'>
            <NewShippingLayoutErrorStep1 />
          </Col>
        </Row>
      </Col>
    </NewShippingLayoutStep>
  );
}

export default NewShippingMultiStep1;
