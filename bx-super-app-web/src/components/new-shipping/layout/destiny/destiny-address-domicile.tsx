import { Row, Col } from '@bx-design/react-grid';

import styles from './destiny-address-domicile.module.scss';
import NewShippingFormDestinyAutocomplete from 'components/new-shipping/form/destiny/autocomplete';
import NewShippingFormDestinyComplement from 'components/new-shipping/form/destiny/complement';
import NewShippingFormDestinyReference from 'components/new-shipping/form/destiny/reference';
import NewShippingLayoutDestinyAddressDomicileMap from './destiny-address-domicile-map';

function NewShippingLayoutDestinyAddressDomicile(): JSX.Element {
  return (
    <Col col='12'>
      <Row className='justify-center'>
        <Col xl='12'>
          <Row className='justify-between'>
            <Col col='12' xl='6' className='mb-6 xl:mb-0'>
              <Row className='justify-between'>
                <Col col='12' className='mb-6 xl:mb-6'>
                  <NewShippingFormDestinyAutocomplete />
                </Col>
                <Col col='12' className='mb-6 xl:mb-6'>
                  <NewShippingFormDestinyComplement />
                </Col>
                <Col col='12' className='mb-6 xl:mb-4'>
                  <NewShippingFormDestinyReference />
                </Col>
                <Col col='12'>
                  <p className={styles.required}>( * ) Campo obligatorio</p>
                </Col>
              </Row>
            </Col>
            <Col col='12' xl='6' className='mb-6 xl:mb-2'>
              <NewShippingLayoutDestinyAddressDomicileMap />
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
  );
}

export default NewShippingLayoutDestinyAddressDomicile;
