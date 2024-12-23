import { Row, Col } from '@bx-design/react-grid';

import styles from 'components/new-shipping/layout/current-item/receiver-multi.module.scss';
import NewShippingFormDestinyName from 'components/new-shipping/form/destiny/name';
import NewShippingFormDestinyLastName from 'components/new-shipping/form/destiny/lastname';
import NewShippingFormDestinyEmail from 'components/new-shipping/form/destiny/email';
import NewShippingFormDestinyRut from 'components/new-shipping/form/destiny/rut';
import NewShippingFormDestinyPhone from 'components/new-shipping/form/destiny/phone';

function NewShippingLayoutCurrentItemReceiverMulti(): JSX.Element {
  return (
    <Col xl='12'>
      <Row gX='3' className='justify-between mb-6 xl:mb-6'>
        <Col col='12' xl='4' className='mb-6 xl:mb-0'>
          <NewShippingFormDestinyName />
        </Col>
        <Col col='12' xl='4'>
          <NewShippingFormDestinyLastName />
        </Col>
        <Col col='12' xl='4' className='mb-6 xl:mb-0'>
          <NewShippingFormDestinyRut />
        </Col>
      </Row>

      <Row gX='3' className='justify-between mb-6 xl:mb-6'>
        <Col col='12' xl='6'>
          <NewShippingFormDestinyEmail />
        </Col>
        <Col col='12' xl='6' className='mb-6 xl:mb-0'>
          <NewShippingFormDestinyPhone />
        </Col>
      </Row>

      <Row gX='3' className='justify-between xl:mb-6'>
        <Col col='12' xl='6' className='mb-6 xl:mb-0'>
          <p className={styles.required}>( * ) Campo obligatorio</p>
        </Col>
      </Row>
    </Col>
  );
}

export default NewShippingLayoutCurrentItemReceiverMulti;
