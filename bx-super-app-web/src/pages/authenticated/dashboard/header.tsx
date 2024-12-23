import { FC } from 'react';
import styled from 'styled-components';
import { Row, Col } from '@bx-design/react-grid';
import { useAuth } from 'contexts/auth-context';
import ShippingsDashboard from 'components/authenticated/dashboard/with-pyme-view/shippings';
import Popup from 'components/authenticated/dashboard/popup';
import { Slider } from 'components/authenticated/dashboard/slider';
import styles from './header.module.scss';

const DashboardHeader: FC = () => {
  const { user } = useAuth();
  return (
    <Row>
      <Col col='12'>
        <Row className='justify-center'>
          <Col col='12' xl='12'>
            <Popup />
          </Col>
          <Col col='12'>
            <Row>
              <Col>
                <Title>Hola {user?.name}!</Title>
                <Subtitle>Con Blue Express llegas a todo Chile</Subtitle>
              </Col>
            </Row>
          </Col>
          <Col col='12'>
            <Row className='my-6' g='4'>
              <Col col='12' sm='4'>
                <ShippingsDashboard />
              </Col>
              <Col col='12' sm='8' className={styles.slider}>
                <Slider></Slider>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

const Title = styled.div`
  font-family: var(--bx-font-primary);
  font-style: normal;
  font-weight: 900;
  font-size: 36px;
  color: var(--bx-color-blue);
  width: max-content;
  line-height: 1em;
  margin-top: 24px;
  max-width: 100%;
`;

const Subtitle = styled.span`
  font-family: var(--bx-font-primary);
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  color: var(--bx-color-blue);
  width: max-content;
  font-weight: 900;
  max-width: 100%;
`;

export default DashboardHeader;
