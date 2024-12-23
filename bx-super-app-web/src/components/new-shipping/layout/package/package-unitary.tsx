import { Row, Col } from '@bx-design/react-grid';
import cs from 'classnames';

import styles from 'components/new-shipping/layout/package/package-unitary.module.scss';
import { BxDown } from '@bx-design/react-icons';
import { Collapse } from 'components/ui-bx/collapse';
import { Card, CardBody } from 'components/ui-bx/card';
import NewShippingLayoutShippingUnitary from 'components/new-shipping/layout/shipping/shipping-unitary';
import NewShippingFormPackageDangerous from 'components/new-shipping/form/package/dangerous';
import NewShippingFormPackageContent from 'components/new-shipping/form/package/content';
import NewShippingLayoutWarrantyShow from 'components/new-shipping/layout/warranty-show';
import NewShippingFormPackageValue from 'components/new-shipping/form/package/value';
import NewShippingFormPackageBillNumber from 'components/new-shipping/form/package/bill-number';
import NewShippingFormPackageWarranty from 'components/new-shipping/form/package/warranty';
import { useShippingContentDataIsCollapsed } from 'emission-lib/hooks/emission-state';
import { useShippings } from 'emission-lib/hooks/shipping';
import { ShippingProvider } from 'emission-lib/contexts/shipping-context';
import NewShippingLayoutPackageProvider from 'components/new-shipping/provider/package-provider';

function NewShippingLayoutPackageUnitary(): JSX.Element {
  const [shippingAtoms, removeShippingAtom] = useShippings();
  const [isCollapsed, setIsCollapsed] = useShippingContentDataIsCollapsed();

  const handleCollapse = (): void => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Card>
      <CardBody padding='dashboard'>
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
            <h1 className={styles.title}>¿Qué estás enviando?</h1>
            <p className={styles.text}>
              Coméntanos qué contenido estás enviando
            </p>
          </Col>
        </Row>

        <Collapse in={isCollapsed}>
          <Row className='justify-center'>
            {shippingAtoms.map((shippingAtom) => (
              <ShippingProvider
                shippingAtom={shippingAtom}
                key={shippingAtom.toString()}
                removeShippingAtom={removeShippingAtom}
              >
                <NewShippingLayoutPackageProvider>
                  <Col col='12' xl='8' lg='8'>
                    <Row className='lg:my-2 my-6'>
                      <Col>
                        <NewShippingFormPackageDangerous />
                      </Col>
                    </Row>
                    <Row className='lg:my-6 my-0'>
                      <Col col='12' xl='8' lg='8'>
                        <NewShippingFormPackageContent />
                      </Col>
                      <Col col='12' xl='4' lg='4'>
                        <NewShippingFormPackageValue />
                      </Col>
                    </Row>
                  </Col>
                  <Col col='12' xl='4' lg='4'>
                    <Row className='lg:my-2 my-6'>
                      <Col>
                        <NewShippingFormPackageWarranty />
                      </Col>
                    </Row>
                    <Row className='lg:my-6 my-0'>
                      <Col>
                        <NewShippingLayoutWarrantyShow>
                          <NewShippingFormPackageBillNumber />
                        </NewShippingLayoutWarrantyShow>
                      </Col>
                    </Row>
                  </Col>
                </NewShippingLayoutPackageProvider>
              </ShippingProvider>
            ))}
          </Row>

          <Row className='justify-start mb-6'>
            <Col xl='11'>
              <p className={styles.required}>( * ) Campo obligatorio</p>
            </Col>
          </Row>
          <NewShippingLayoutShippingUnitary />
        </Collapse>
      </CardBody>
    </Card>
  );
}

export default NewShippingLayoutPackageUnitary;
