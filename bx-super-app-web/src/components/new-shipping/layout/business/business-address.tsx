import { Row, Col } from '@bx-design/react-grid';
import cs from 'classnames';

import { Card, CardBody } from 'components/ui-bx/card';
import { Collapse } from 'components/ui-bx/collapse';
import { BxDown } from '@bx-design/react-icons';
import styles from './business-address.module.scss';
import NewShippingFormBusinessRegion from '../../form/business/region';
import NewShippingFormBusinessCommune from '../../form/business/commune';
import NewShippingFormBusinessAgencies from '../../form/business/agencies';
import { useEmitterAddressIsCollapsed } from 'emission-lib/hooks/emission-state';
import NewShippingLayoutAgenciesMap from 'components/new-shipping/layout/agencies/map';

function NewShippingLayoutBusinessAddress(): JSX.Element {
  const [isCollapsed, setIsCollapsed] = useEmitterAddressIsCollapsed();

  const handleCollapse = (): void => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Card>
      <CardBody padding='dashboard'>
        <div className={styles.boxHeight}>
          <Row>
            <Col>
              <div
                className={cs(styles.collapseButton, {
                  [styles.collapseButtonOn]: isCollapsed,
                })}
                onClick={handleCollapse}
              >
                <BxDown size={16} />
              </div>
              <h1 className={styles.title}>Dirección de origen</h1>
              <p className={styles.text}>
                Debes seleccionar la dirección de origen del punto Blue Express,
                donde recepcionamos tu envío.
              </p>
            </Col>
          </Row>
          <Collapse in={isCollapsed}>
            <Row className='mb-4 xl:mb-6'>
              <Col col='12' lg='6'>
                <Row gX='3' className='justify-between mb-6 xl:mb-6'>
                  <Col col='12' xl='12' className='mb-6 xl:mb-4'>
                    <NewShippingFormBusinessRegion />
                  </Col>
                  <Col col='12' xl='12' className='mb-6 xl:mb-4'>
                    <NewShippingFormBusinessCommune />
                  </Col>
                  <Col col='12' xl='6' className='mb-2 xl:mb-4'>
                    <p className={styles.required}>( * ) Campo obligatorio</p>
                  </Col>
                  <Col col='12' lg='12'>
                    <NewShippingLayoutAgenciesMap cacheKey='new-shipping-origin-agencies' />
                    <p className={styles.mapSubtext}>
                      ** Si tu envío tiene origen en una zona franca, te
                      recomendamos revisar las condiciones necesarias en el
                      servicio de aduana.
                    </p>
                  </Col>
                </Row>
              </Col>
              <Col col='12' lg='6'>
                <Row gX='5' className='justify-between xl:mb-6'>
                  <Col className='hidden lg:block lg:mb-6'>
                    <Col className='lg:mb-2'></Col>
                  </Col>
                  <Col col='12' xl='12' className='mb-6 xl:mb-0'>
                    <NewShippingFormBusinessAgencies />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Collapse>
        </div>
      </CardBody>
    </Card>
  );
}

export default NewShippingLayoutBusinessAddress;
