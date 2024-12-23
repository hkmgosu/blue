import { Row, Col } from '@bx-design/react-grid';

import styles from './step.module.scss';
import { Stepper } from 'components/ui-bx/stepper';
import AssistedShippingUnitary from '../assisted-shipping';
import AssistedShippingMulti from '../assisted-shipping/multi';
// import AssistedShippingMassive from '../assisted-shipping/massive';
import { useLocation } from 'react-router-dom';

export interface Step {
  isActive: boolean;
  text: string;
  step: string;
  slotRight?: any;
  slotLeft?: any;
}

interface Props {
  steps: Step[];
  slotRight?: any;
  slotLeft?: any;
}

function NewShippingLayoutSteper({
  steps,
  slotRight,
  slotLeft,
}: Props): JSX.Element {
  const location = useLocation();
  /**
   * @todo Eliminar el apalancamiento de location, he agregado las props slotLeft y slotRight, con esto puede anidar libremente estas vistas sin depender de la ruta
   */
  return (
    <Row className={`justify-center items-center ${styles.container}`}>
      <Col col='12' xl='3' className='pb-6 order-0'>
        {location.pathname === '/new-shipping/unitary' && (
          <AssistedShippingUnitary />
        )}
        {location.pathname === '/new-shipping/multi' && (
          <AssistedShippingMulti />
        )}
        {/* {location.pathname === '/new-shipping/massive' && (
          <AssistedShippingMassive />
        )} */}
        {slotLeft}
      </Col>
      <Col col='12' xl='6'>
        <Row className='justify-center'>
          <Col>
            <nav className={styles.nav}>
              <Stepper steps={steps} />
            </nav>
          </Col>
        </Row>
      </Col>
      <Col col='12' xl='3'>
        {slotRight}
      </Col>
    </Row>
  );
}

export default NewShippingLayoutSteper;
