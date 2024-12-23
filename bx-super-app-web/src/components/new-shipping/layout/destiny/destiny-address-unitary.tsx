import { Row, Col } from '@bx-design/react-grid';

import styles from 'components/new-shipping/layout/destiny/destiny-receiver-unitary.module.scss';
import { Card, CardBody } from 'components/ui-bx/card';
import NewShippingFormDestinySelectAddress from 'components/new-shipping/form/destiny/select-address';
import NewShippingLayoutDestinyAddressType from 'components/new-shipping/layout/destiny/destiny-address-type';
import { useShippings } from 'emission-lib/hooks/shipping';
import { ShippingProvider } from 'emission-lib/contexts/shipping-context';

function NewShippingLayoutDestinyAddressUnitary(): JSX.Element {
  const [shippingAtoms, removeShippingAtom] = useShippings();
  return (
    <Card>
      <CardBody padding='dashboard'>
        <div className={styles.container}>
          <Row className='mb-2 lg:mb-6'>
            <Col col='12'>
              <h1 className={styles.title}>Dirección de destino</h1>
              <p className={styles.text}>
                Debes seleccionar hacia dónde envías: un punto Blue Express o un
                domiclio, y completar
              </p>
            </Col>
          </Row>
          <Row className='justify-center lg:mb-6'>
            {shippingAtoms.map((shippingAtom) => (
              <ShippingProvider
                shippingAtom={shippingAtom}
                key={shippingAtom.toString()}
                removeShippingAtom={removeShippingAtom}
              >
                <Col xl='12'>
                  <Row gX='5' className='justify-around mb-6 xl:mb-1'>
                    <Col col='12' xl='12' className='mb-6 xl:mb-0'>
                      <NewShippingFormDestinySelectAddress />
                    </Col>
                  </Row>
                </Col>
              </ShippingProvider>
            ))}
          </Row>
          <Row>
            {shippingAtoms.map((shippingAtom) => (
              <ShippingProvider
                shippingAtom={shippingAtom}
                key={shippingAtom.toString()}
                removeShippingAtom={removeShippingAtom}
              >
                <Col xl='12'>
                  <NewShippingLayoutDestinyAddressType />
                </Col>
              </ShippingProvider>
            ))}
          </Row>
        </div>
      </CardBody>
    </Card>
  );
}

export default NewShippingLayoutDestinyAddressUnitary;
