import { Row, Col } from '@bx-design/react-grid';

import styles from './destiny-pickup-multi.module.scss';
import NewShippingFormDestinyRegion from 'components/new-shipping/form/destiny/region';
import NewShippingFormDestinyCommune from 'components/new-shipping/form/destiny/commune';
import NewShippingLayoutCurrentItemDestinyAgenciesMulti from './agencies-multi';
import NewShippingLayoutAgenciesMultiMap from '../agencies-multi/map';
import { useShippingId } from 'emission-lib/hooks/shipping';

function NewShippingLayoutCurrentItemDestinyPickupMulti(): JSX.Element {
  const shippingId = useShippingId();
  return (
    <Col col='12'>
      <Row className='justify-center'>
        <Col col='12' xl='6'>
          <Row className='justify-between mb-6 xl:mb-0'>
            <Col col='12' xl='12' className='mb-6 xl:mb-0'>
              <NewShippingFormDestinyRegion />
            </Col>
            <Col col='12' xl='12' className='mb-6 xl:mb-2'>
              <NewShippingFormDestinyCommune />
            </Col>

            <Row className='justify-between xl:mb-2'>
              <Col col='12' xl='6'>
                <p className={styles.required}>( * ) Campo obligatorio</p>
              </Col>
              <Col col='12' xl='6'></Col>
            </Row>

            <Col col='12' xl='12'>
              <NewShippingLayoutAgenciesMultiMap
                cacheKey={`new-shipping-agencies-${shippingId}`}
              />
            </Col>
            <Col col='12' xl='6' />
          </Row>
        </Col>
        <Col col='12' lg='6'>
          <Row className='justify-between xl:mb-6'>
            <Col col='12' xl='12' className='mb-6 xl:mb-0'>
              <NewShippingLayoutCurrentItemDestinyAgenciesMulti />
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
  );
}

export default NewShippingLayoutCurrentItemDestinyPickupMulti;
