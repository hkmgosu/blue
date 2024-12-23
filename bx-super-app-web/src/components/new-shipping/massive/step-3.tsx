import { Row, Col } from '@bx-design/react-grid';

import NewShippingLayoutCurrentItemNextMulti from 'components/new-shipping/layout/current-item/next-multi';
import NewShippingLayoutStep from 'components/new-shipping/layout/step/step';
import NewShippingLayoutMassiveStep2Title from 'components/new-shipping/layout/massive/step-3-title';
import NewShippingLayoutStatusLegend from 'components/new-shipping/layout/status/legend';
import NewShippingLayoutDestinyReceiverLeftMulti from 'components/new-shipping/layout/destiny/receiver-left-multi';
import NewShippingLayoutCurrentItemCurrentMulti from 'components/new-shipping/layout/current-item/current-multi';
import NewShippingMassiveAssistedList from './assisted/list';
import NewShippingLayoutErrorNextProvider from '../layout/error-next/provider';

function NewShippingMassiveStep3(): JSX.Element {
  return (
    <NewShippingLayoutStep>
      <NewShippingLayoutErrorNextProvider />
      <NewShippingMassiveAssistedList />
      <Col col='12' className='mb-2 xl:mb-12'>
        <NewShippingLayoutMassiveStep2Title />
      </Col>

      <Col col='12' className='mb-2 xl:mb-12'>
        <Row gX='3'>
          <Col col='12' xl='4'>
            <Row>
              <Col col='12' className='mb-4'>
                <NewShippingLayoutStatusLegend />
              </Col>
              <Col col='12'>
                <NewShippingLayoutDestinyReceiverLeftMulti />
              </Col>
            </Row>
          </Col>
          <Col col='12' xl='8'>
            <Row>
              <Col col='12' className='mb-2 xl:mb-12'>
                <NewShippingLayoutCurrentItemCurrentMulti />
              </Col>
              <Col col='12'>
                <NewShippingLayoutCurrentItemNextMulti isMassive />
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </NewShippingLayoutStep>
  );
}

export default NewShippingMassiveStep3;
