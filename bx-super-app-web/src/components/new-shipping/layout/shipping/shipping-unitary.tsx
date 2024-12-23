import { Row, Col } from '@bx-design/react-grid';

import styles from 'components/new-shipping/layout/shipping/shipping-unitary.module.scss';
import NewShippingFormShippingSizeBox from 'components/new-shipping/form/shipping/size-box';
import NewShippingLayoutInputSizesGrid from 'components/new-shipping/layout/input/sizes-grid';
import NewShippingLayoutSizeWarning from 'components/new-shipping/layout/sizes/size-warning-text';
import NewShippingLayoutShippingInputLengthUnitary from 'components/new-shipping/layout/shipping/shipping-input-length-unitary';
import NewShippingLayoutShippingInputWidthUnitary from 'components/new-shipping/layout/shipping/shipping-input-width-unitary';
import NewShippingLayoutShippingInputHeightUnitary from 'components/new-shipping/layout/shipping/shipping-input-height-unitary';
import NewShippingLayoutShippingInputWeightUnitary from 'components/new-shipping/layout/shipping/shipping-input-weight-unitary';
import NewShippingLayoutSizeButtons from 'components/new-shipping/layout/sizes/size-buttons';
import NewShippingLayoutVolumetricError from './shipping-unitary-volumetric-error';
import NewShippingLayoutWeightError from './shipping-unitary-weight-error';
import NewShippingLayoutEdgeError from './shipping-unitary-edge-error';
import { useShippings } from 'emission-lib/hooks/shipping';
import { ShippingProvider } from 'emission-lib/contexts/shipping-context';
import NewShippingLayoutPackageProvider from 'components/new-shipping/provider/package-provider';

function NewShippingLayoutShippingUnitary(): JSX.Element {
  const [shippingAtoms, removeShippingAtom] = useShippings();

  return (
    <>
      <Row className='mb-4 xl:mb-6'>
        <Col col='12'>
          <h1 className={styles.title}>Tamaño del envío</h1>
          <p className={styles.text}>
            Puedes seleccionar uno de nuestros tamaños estándar o personalizar
            tus dimensiones
          </p>
        </Col>
      </Row>
      <Row>
        {shippingAtoms.map((shippingAtom) => (
          <ShippingProvider
            shippingAtom={shippingAtom}
            key={shippingAtom.toString()}
            removeShippingAtom={removeShippingAtom}
          >
            <NewShippingLayoutPackageProvider>
              <NewShippingLayoutVolumetricError />
              <NewShippingLayoutWeightError />
              <NewShippingLayoutEdgeError />
              <Col col='12' xl='12'>
                <Row className='lg:justify-start lg:mb-2'>
                  <Col col='12' lg='6'>
                    <NewShippingLayoutSizeButtons />
                  </Col>

                  <Col col='12' lg='6'>
                    <Row>
                      <Col col='12'>
                        <NewShippingLayoutInputSizesGrid
                          length={
                            <NewShippingLayoutShippingInputLengthUnitary />
                          }
                          width={<NewShippingLayoutShippingInputWidthUnitary />}
                          height={
                            <NewShippingLayoutShippingInputHeightUnitary />
                          }
                          weight={
                            <NewShippingLayoutShippingInputWeightUnitary />
                          }
                        />
                      </Col>
                      <Col col='12'>
                        <NewShippingFormShippingSizeBox />
                      </Col>
                    </Row>
                  </Col>
                </Row>

                <Row className='xl:items-center'>
                  <Col xl='12'>
                    <NewShippingLayoutSizeWarning />
                  </Col>
                </Row>
              </Col>
            </NewShippingLayoutPackageProvider>
          </ShippingProvider>
        ))}
      </Row>
    </>
  );
}

export default NewShippingLayoutShippingUnitary;
