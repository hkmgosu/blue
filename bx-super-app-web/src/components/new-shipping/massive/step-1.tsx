import { Row, Col } from '@bx-design/react-grid';

import NewShippingLayoutStep from 'components/new-shipping/layout/step/step';
import NewShippingLayoutBusinessEmitter from 'components/new-shipping/layout/business/business-emitter';
import NewShippingLayoutBusinessAddress from 'components/new-shipping/layout/business/business-address';
import NewShippingLayoutBusinessNext from 'components/new-shipping/layout/business/business-next';
import NewShippingLayoutErrorStep1 from 'components/new-shipping/layout/error/step-1';
import NewShippingMassiveAssistedOrigin from './assisted/origin';

function NewShippingMassiveStep1(): JSX.Element {
  return (
    <NewShippingLayoutStep>
      <NewShippingMassiveAssistedOrigin />
      <Row>
        <Col col='12' lg='6' className='ml-[50%]'>
          <NewShippingLayoutErrorStep1 />
        </Col>
      </Row>
      <Col col='12' lg='4' className='mb-2 xl:mb-12'>
        <NewShippingLayoutBusinessEmitter
          disabledBusinessSaveOrigin
          description='Debes completar los datos del remitente'
        />
      </Col>
      <Col col='12' lg='8' className='mb-2 xl:mb-12'>
        <NewShippingLayoutBusinessAddress />
      </Col>
      <Col col='12'>
        <NewShippingLayoutBusinessNext />
      </Col>
      <Col col='12'></Col>
    </NewShippingLayoutStep>
  );
}

export default NewShippingMassiveStep1;
