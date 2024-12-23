import { Row, Col } from '@bx-design/react-grid';

import styles from './step-3-title.module.scss';

function NewShippingLayoutMassiveStep2Title(): JSX.Element {
  return (
    <Row>
      <Col col='12'>
        <h1 className={styles.title}>Lista carga masiva</h1>
      </Col>
    </Row>
  );
}

export default NewShippingLayoutMassiveStep2Title;
