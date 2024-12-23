import { Col, Row } from '@bx-design/react-grid';
import { BxLeft } from '@bx-design/react-icons';
import { Card, CardBody } from 'components/ui-bx/card';

import { useHistory } from 'react-router-dom';
import ProhibitedCargoImages from './prohibited-cargo-images';
import cx from 'clsx';
type Props = {
  backButton?: boolean;
  spacing?: 'default' | 'reduced';
};

function ProhibitedCargo({ backButton, spacing }: Props): JSX.Element {
  const history = useHistory();

  return (
    <Row>
      <Col col='12' className='mb-4 lg:mb-0'>
        {backButton && (
          <div
            className='text-xs font-bold flex items-center text-bx-blue cursor-pointer'
            onClick={() => history.push('/tips')}
          >
            <div className='flex items-center justify-center mr-2'>
              <BxLeft size={20} color='var(--bx-color-lblue)' />
            </div>
            <div>Volver atrás</div>
          </div>
        )}
      </Col>
      <Col
        col='12'
        className={cx(spacing === 'default' ? 'lg:mb-6' : 'lg:mb-1')}
      >
        <h1 className='font-extrabold text-[26px] mb-6 text-center'>
          Cargas prohibidas
        </h1>
      </Col>
      <Col col='12'>
        <Card>
          <CardBody>
            <ProhibitedCargoImages spacing='default' />
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}

export default ProhibitedCargo;
