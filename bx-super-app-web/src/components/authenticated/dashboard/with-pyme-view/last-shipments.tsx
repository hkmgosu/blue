import { FC } from 'react';
import { Row, Col } from '@bx-design/react-grid';
import cs from 'classnames';

import { Card, CardBody } from 'components/ui-bx/card';
import commonStyle from './dashboard.module.scss';
import styles from './last-shipments.module.scss';

const LastShipmentsCard: FC = () => {
  return (
    <Card>
      <CardBody>
        <div className={commonStyle.title}>Tus últimos envíos realizados</div>
        <Row>
          <Col sm='12'>
            <Row className='items-center'>
              <Col col='12'>
                <div
                  className={cs(
                    commonStyle.imageContainer,
                    styles.imageContainer
                  )}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default LastShipmentsCard;
