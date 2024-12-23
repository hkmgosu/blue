import { Row, Col } from '@bx-design/react-grid';

import styles from './destiny-pickup.module.scss';
import NewShippingFormDestinyRegion from '../../form/destiny/region';
import NewShippingFormDestinyCommune from '../../form/destiny/commune';
import NewShippingFormAgenciesAgencies from '../../form/destiny/agencies';
import NewShippingLayoutAgenciesMultiMap from '../agencies-multi/map';
import { useShippingId } from 'emission-lib/hooks/shipping';

function NewShippingLayoutDestinyPickup(): JSX.Element {
  const shippingId = useShippingId();
  return (
    <Col col='12'>
      <Row>
        <Col col='12' lg='6'>
          <Row className='justify-between mb-6 lg:mb-0'>
            <Col col='12' xl='12' className='mb-6 lg:mb-2'>
              <Row>
                <Col col='12' lg='12' className='mb-2'>
                  <NewShippingFormDestinyRegion />
                </Col>
                <Col col='12' lg='12' className='mb-4'>
                  <NewShippingFormDestinyCommune />
                </Col>
              </Row>
              <Col col='12' xl='6' className='mb-2 lg:mb-0'>
                <p className={styles.required}>( * ) Campo obligatorio</p>
              </Col>

              <NewShippingLayoutAgenciesMultiMap
                cacheKey={`new-shipping-destiny-agencies-${shippingId}`}
              />
            </Col>
          </Row>
        </Col>
        <Col col='12' lg='6'>
          <Row className='justify-between lg:mb-6'>
            <Col col='12' xl='12' className='mb-6 lg:mb-0'>
              <NewShippingFormAgenciesAgencies />
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
  );
}

export default NewShippingLayoutDestinyPickup;
