import { Row, Col } from '@bx-design/react-grid';

import NewShippingLayoutDestinyNext from 'components/new-shipping/layout/destiny/destiny-b-next';
import NewShippingLayoutStep from 'components/new-shipping/layout/step/step';
import NewShippingLayoutDestinyReceiverUnitary from 'components/new-shipping/layout/destiny/destiny-receiver-unitary';
import NewShippingLayoutDestinyAddressUnitary from 'components/new-shipping/layout/destiny/destiny-address-unitary';
import NewShippingLayoutPackageUnitary from 'components/new-shipping/layout/package/package-unitary';
import NewShippingLayoutServiceTypeUnitary from 'components/new-shipping/layout/service/service-type-unitary';
import {
  Elabel,
  ElabelModal,
} from 'components/new-shipping/layout/service/e-label/e-label';
import NewShippingLayoutErrorStep2 from 'components/new-shipping/layout/error/step-2';
import NewShippingFormShippingBack from 'components/new-shipping/form/shipping/back';
import NewShippingFormShippingNextInDestinyForm from 'components/new-shipping/form/shipping/next-in-destiny';
import UnitaryShippingProvider from './shipping-provider';
import NewShippingUnitaryAssistedDestiny from './assisted/destiny';
import NewShippingUnitaryAssistedService from './assisted/service';

function NewShippingUnitaryStep2({
  destinyView,
}: {
  destinyView: number;
}): JSX.Element {
  return (
    <NewShippingLayoutStep>
      {destinyView === 1 && (
        <>
          <NewShippingUnitaryAssistedDestiny destinyView={destinyView} />
          <UnitaryShippingProvider>
            <Col col='12' lg='4' className='mb-2 xl:mb-4'>
              <NewShippingLayoutDestinyReceiverUnitary />
            </Col>
            <Col col='12' lg='8' className='mb-6 xl:mb-4'>
              <NewShippingLayoutDestinyAddressUnitary />
            </Col>
            <Row className='items-center justify-center'>
              <Col col='6' lg='12'>
                <NewShippingLayoutErrorStep2 />
              </Col>
            </Row>

            <Col col='12' className='mb-2 xl:mb-4'>
              <Row className='justify-center'>
                <Col xl='12'>
                  <Row className='xl:items-center'>
                    <Col col='12' xl='4' />
                    <Col col='12' xl='8'>
                      <Row className='xl:justify-end items-center'>
                        <Col xl='6' col='12' className='mb-6 xl:mb-0'></Col>
                        <Col xl='3'>
                          <NewShippingFormShippingBack />
                        </Col>
                        <Col xl='3'>
                          <NewShippingFormShippingNextInDestinyForm />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </UnitaryShippingProvider>
        </>
      )}
      {destinyView === 2 && (
        <>
          <NewShippingUnitaryAssistedService destinyView={destinyView} />
          <UnitaryShippingProvider>
            <Col col='12' lg='8' className='mb-2 xl:mb-4'>
              <NewShippingLayoutPackageUnitary />
            </Col>

            <Col col='12' lg='4' className='mb-6 xl:mb-4'>
              <NewShippingLayoutServiceTypeUnitary />
              <Elabel />
              <ElabelModal />
            </Col>
            <Row className='items-center justify-center'>
              <Col col='6' lg='12'>
                <NewShippingLayoutErrorStep2 />
              </Col>
            </Row>
            <Col col='12' className='mb-2 xl:mb-4'>
              <NewShippingLayoutDestinyNext />
            </Col>
          </UnitaryShippingProvider>
        </>
      )}
    </NewShippingLayoutStep>
  );
}

export default NewShippingUnitaryStep2;
