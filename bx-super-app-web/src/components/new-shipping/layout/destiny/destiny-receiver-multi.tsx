import { Row, Col } from '@bx-design/react-grid';

import { Card, CardBody } from 'components/ui-bx/card';
import styles from './destiny-receiver-multi.module.scss';

function NewShippingLayoutDestinyReceiverMulti(): JSX.Element {
  return (
    <Card>
      <CardBody>
        <Row>
          <Col col='12'>
            <h1 className={styles.title}>Información Destinatario y Pedido</h1>
            <p className={styles.text}>
              Debes completar los datos del destino y el pedido, en cada uno de
              los envíos.
            </p>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
}

export default NewShippingLayoutDestinyReceiverMulti;
