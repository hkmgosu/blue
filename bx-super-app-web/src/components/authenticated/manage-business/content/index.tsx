import { useState } from 'react';
import { Col, Row } from '@bx-design/react-grid';
import { BxBuilding } from '@bx-design/react-icons';

import { Card, CardBody } from 'components/ui-bx/card';
import styles from './styles.module.scss';
import ManageBusinessList from '../list';
import ManageBusinessCurrent from '../current';

export default function ManageBusinessContent(): JSX.Element {
  const [pymeSelected, setPymeSelected] = useState('');
  return (
    <Card>
      <CardBody>
        <Row>
          <Col col='12' className='mb-12'>
            <div className={styles.BoxContent}>
              <div className={styles.BoxIcon}>
                <BxBuilding />
              </div>
              <h2 className={styles.Title}>Mis negocios</h2>
            </div>
          </Col>
          <Col col='12' className='mb-12'>
            <ManageBusinessList
              pymeSelected={pymeSelected}
              setPymeSelected={setPymeSelected}
            />
          </Col>
          <hr className={styles.Hr} />
          <Col col='12'>
            <ManageBusinessCurrent pymeId={pymeSelected} />
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
}
