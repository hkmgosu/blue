import { Row, Col } from '@bx-design/react-grid';
import cs from 'classnames';

import styles from './service-type-unitary.module.scss';
import { BxDown } from '@bx-design/react-icons';
import { Collapse } from 'components/ui-bx/collapse';
import { Card, CardBody } from 'components/ui-bx/card';
import NewShippingLayoutService from 'components/new-shipping/layout/service';
import NewShippingLayoutInfoBox from 'components/new-shipping/layout/info-box';
import { useServiceTypeIsCollapsed } from 'emission-lib/hooks/emission-state';
import { useShippings } from 'emission-lib/hooks/shipping';
import { ShippingProvider } from 'emission-lib/contexts/shipping-context';
import NewShippingLayoutPackageProvider from 'components/new-shipping/provider/package-provider';

function NewShippingLayoutServiceTypeUnitary(): JSX.Element {
  const [shippingAtoms, removeShippingAtom] = useShippings();
  const [isCollapsed, setIsCollapsed] = useServiceTypeIsCollapsed();

  const handleCollapse = (): void => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Card>
      <CardBody padding='dashboard'>
        <Row className='mb-12 lg:mb-2'>
          <Col col='12'>
            <div
              className={cs(styles.collapseButton, {
                [styles.collapseButtonOn]: isCollapsed,
              })}
              onClick={handleCollapse}
            >
              <BxDown size={16} />
            </div>
            <h1 className={styles.title}>Tipo de servicio</h1>
          </Col>
        </Row>
        <Collapse in={isCollapsed}>
          <Row className='justify-center mb-6 xl:mb-4'>
            {shippingAtoms.map((shippingAtom) => (
              <ShippingProvider
                shippingAtom={shippingAtom}
                key={shippingAtom.toString()}
                removeShippingAtom={removeShippingAtom}
              >
                <NewShippingLayoutPackageProvider>
                  <Col xl='12'>
                    <Row>
                      <Col col='12' xl='12'>
                        <Row>
                          <NewShippingLayoutService />
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                </NewShippingLayoutPackageProvider>
              </ShippingProvider>
            ))}
          </Row>
          <Row className='justify-center'>
            <Col col='12' xl='12'>
              <NewShippingLayoutInfoBox
                title={
                  <>
                    Los tiempos de entrega comienzan una vez que recibimos tu
                    envío en el{' '}
                    <span className={styles.orangeText}>
                      Punto Blue Express
                    </span>
                    . Te recomendamos realizarlo previo a las 16 hrs, si lo
                    realizas posterior al horario se suman 24 hrs adicional al
                    servicio.
                  </>
                }
              />
            </Col>
          </Row>
        </Collapse>
      </CardBody>
    </Card>
  );
}

export default NewShippingLayoutServiceTypeUnitary;
