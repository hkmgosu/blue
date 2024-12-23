import { Row, Col } from '@bx-design/react-grid';
import cs from 'classnames';

import styles from 'components/new-shipping/layout/destiny/destiny-receiver-unitary.module.scss';
import { BxDown } from '@bx-design/react-icons';
import { Card, CardBody } from 'components/ui-bx/card';
import { Collapse } from 'components/ui-bx/collapse';
import NewShippingFormDestinyName from 'components/new-shipping/form/destiny/name';
import NewShippingFormDestinyLastName from 'components/new-shipping/form/destiny/lastname';
import NewShippingFormDestinyEmail from 'components/new-shipping/form/destiny/email';
import NewShippingFormDestinyRut from 'components/new-shipping/form/destiny/rut';
import NewShippingFormDestinyPhone from 'components/new-shipping/form/destiny/phone';
import { useReceiverAddressIsCollapsed } from 'emission-lib/hooks/emission-state';
import { useShippings } from 'emission-lib/hooks/shipping';
import { ShippingProvider } from 'emission-lib/contexts/shipping-context';
import NewShippingLayoutFrequentClients from 'components/new-shipping/layout/frequent-clients/button';
import NewShippingLayoutFrequentClientsModal from 'components/new-shipping/layout/frequent-clients/modal';
import NewShippingFormDestinySaveClient from 'components/new-shipping/form/destiny/save-client';

function NewShippingLayoutDestinyReceiverUnitary(): JSX.Element {
  const [shippingAtoms, removeShippingAtom] = useShippings();
  const [isCollapsed, setIsCollapsed] = useReceiverAddressIsCollapsed();

  const handleCollapse = (): void => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <Card>
      <CardBody padding='dashboard'>
        <div className={styles.container}>
          <Row className='mb-4 xl:mb-6'>
            <Col col='12'>
              <div
                className={cs(styles.collapseButton, {
                  [styles.collapseButtonOn]: isCollapsed,
                })}
                onClick={handleCollapse}
              >
                <BxDown size={16} />
              </div>
              <h1 className={styles.title}>Datos del Destinatario</h1>
              <p className={styles.text}>
                Debes completar los datos del destinatario
              </p>
            </Col>
          </Row>
          <Collapse in={isCollapsed}>
            <Row gX='5' className='justify-center'>
              {shippingAtoms.map((shippingAtom) => (
                <ShippingProvider
                  key={shippingAtom.toString()}
                  shippingAtom={shippingAtom}
                  removeShippingAtom={removeShippingAtom}
                >
                  <Col xl='12'>
                    <Row gX='3' className='justify-between mb-6 xl:mb-2'>
                      <Col col='12' className='mb-6 lg:mb-2'>
                        <Row className='justify-start'>
                          <Col col='12' xl='8'>
                            <NewShippingLayoutFrequentClients />
                            <NewShippingLayoutFrequentClientsModal />
                          </Col>
                        </Row>
                      </Col>
                      <Col col='12' xl='6' className='mb-6 lg:mb-2'>
                        <NewShippingFormDestinyName />
                      </Col>
                      <Col col='12' xl='6' className='mb-6 lg:mb-2'>
                        <NewShippingFormDestinyLastName />
                      </Col>
                    </Row>

                    <Row gX='3' className='justify-between mb-6 xl:mb-2'>
                      <Col col='12' xl='6' className='mb-6 lg:mb-2'>
                        <NewShippingFormDestinyRut />
                      </Col>
                      <Col col='12' xl='6' className='mb-6 lg:mb-2'>
                        <NewShippingFormDestinyPhone />
                      </Col>
                      <Col col='12' xl='12' className='mb-6 lg:mb-4'>
                        <NewShippingFormDestinyEmail />
                      </Col>
                      <Col col='12' xl='12' className='mb-6 lg:mb-4'>
                        <p className={styles.required}>
                          ( * ) Campo obligatorio
                        </p>
                      </Col>
                      <Col col='12' xl='12' className='mb-6 lg:mb-4'>
                        <NewShippingFormDestinySaveClient />
                      </Col>
                    </Row>
                  </Col>
                </ShippingProvider>
              ))}
            </Row>
          </Collapse>
        </div>
      </CardBody>
    </Card>
  );
}

export default NewShippingLayoutDestinyReceiverUnitary;
