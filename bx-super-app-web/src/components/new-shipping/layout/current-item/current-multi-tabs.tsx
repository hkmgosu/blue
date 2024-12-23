import { Row, Col } from '@bx-design/react-grid';

import styles from 'components/new-shipping/layout/current-item/current-multi.module.scss';
import { Tab, TabContent } from 'components/ui-bx/tab';
import NewShippingLayoutCurrentItemReceiverMulti from 'components/new-shipping/layout/current-item/receiver-multi';
import NewShippingLayoutCurrentItemDestinyMulti from 'components/new-shipping/layout/current-item/destiny-multi';
import NewShippingLayoutCurrentItemDestinyAddressMulti from 'components/new-shipping/layout/current-item/destiny-address';
import NewShippingLayoutCurrentItemShippingMulti from 'components/new-shipping/layout/current-item/shipping-multi';
import NewShippingLayoutCurrentItemSizeButtonsMulti from 'components/new-shipping/layout/current-item/size-buttons-multi';
import NewShippingFormPackageContent from 'components/new-shipping/form/package/content';
import NewShippingFormPackageDangerous from 'components/new-shipping/form/package/dangerous';
import NewShippingFormPackageWarranty from 'components/new-shipping/form/package/warranty';
import NewShippingLayoutWarrantyShow from 'components/new-shipping/layout/warranty-show';
import NewShippingFormPackageValue from 'components/new-shipping/form/package/value';
import NewShippingFormPackageBillNumber from 'components/new-shipping/form/package/bill-number';
import NewShippingLayoutService from 'components/new-shipping/layout/service';
import NewShippingLayoutCurrentItemSizeBoxMulti from './size-box-multi';
import NewShippingLayoutVolumetricError from '../shipping/shipping-unitary-volumetric-error';
import NewShippingLayoutWeightError from '../shipping/shipping-unitary-weight-error';
import NewShippingLayoutEdgeError from '../shipping/shipping-unitary-edge-error';
import { useMultiSelectedTab } from 'emission-lib/hooks/emission-state';
import NewShippingLayoutPackageProvider from 'components/new-shipping/provider/package-provider';
import NewShippingLayoutInfoBox from 'components/new-shipping/layout/info-box';
import NewShippingLayoutFrequentClientsModal from '../frequent-clients/modal';
import NewShippingLayoutFrequentClients from '../frequent-clients/button';
import NewShippingFormDestinySaveClient from 'components/new-shipping/form/destiny/save-client';

export default function NewShippingLayoutCurrentItemCurrentMultiTabs(): JSX.Element {
  const [selectedTab] = useMultiSelectedTab();

  return (
    <Tab>
      <TabContent activeTabId={selectedTab} tabId={1} willMount={false}>
        <Row className='mb-3'>
          <Col col='12'>
            <Row>
              <Col col='6' xl='6'>
                <h1 className={styles.title}>Datos del Destinatario</h1>
                <p className={styles.text}>
                  Debes completar los datos del destinatario
                </p>
              </Col>
              <Col col='6' xl='6'>
                <Row className='justify-end'>
                  <Col col='12' xl='7'>
                    <NewShippingLayoutFrequentClients />
                    <NewShippingLayoutFrequentClientsModal />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className='justify-center'>
          <NewShippingLayoutCurrentItemReceiverMulti />
        </Row>
        <Row className='mb-12 xl:mb-12'>
          <Col col='12'>
            <h1 className={styles.title}>Dirección de destino</h1>
            <p className={styles.text}>
              Debes seleccionar hacia dónde envías: un punto Blue Express o un
              domiclio, y completar
            </p>
          </Col>
        </Row>

        <Row className='justify-center'>
          <NewShippingLayoutCurrentItemDestinyMulti />
        </Row>

        <Row className='justify-center mb-4 xl:mb-0'>
          <Col xl='12' className='xl:mb-12'>
            <NewShippingLayoutCurrentItemDestinyAddressMulti />
          </Col>
          <Col col='12'>
            <Row className='xl:justify-end'>
              <Col col='12'>
                <NewShippingFormDestinySaveClient withCard={false} />
              </Col>
            </Row>
          </Col>
        </Row>
      </TabContent>

      <TabContent activeTabId={selectedTab} tabId={2} willMount={false}>
        <NewShippingLayoutPackageProvider>
          <Row className='mb-4 xl:mb-6'>
            <Col col='12'>
              <h1 className={styles.title}>¿Qué estás enviando?</h1>
              <p className={styles.text}>
                Coméntanos qué contenido estás enviando
              </p>
            </Col>
          </Row>

          <Row>
            <Col col='12' xl='8' lg='8'>
              <Row className='my-6 lg:my-2'>
                <Col>
                  <NewShippingFormPackageDangerous />
                </Col>
              </Row>
              <Row className='my-0 lg:my-6'>
                <Col col='12' xl='8' lg='8'>
                  <NewShippingFormPackageContent />
                </Col>
                <Col col='12' xl='4' lg='4'>
                  <NewShippingFormPackageValue />
                </Col>
              </Row>
            </Col>
            <Col col='12' xl='4' lg='4'>
              <Row className='my-6 lg:my-2'>
                <Col>
                  <NewShippingFormPackageWarranty />
                </Col>
              </Row>
              <Row className='my-0 lg:my-6'>
                <Col>
                  <NewShippingLayoutWarrantyShow>
                    <NewShippingFormPackageBillNumber />
                  </NewShippingLayoutWarrantyShow>
                </Col>
              </Row>
            </Col>
            <Col>(*) Campo obligatorio</Col>
          </Row>

          <Row className='mt-4 xl:mt-6'>
            <Col col='12'>
              <h1 className={styles.title}>Tamaño de tu envío</h1>
              <p className={styles.textMargin}>
                Selecciona uno de nuestros tamaños predefinidos o personaliza
                tus dimensiones
              </p>
            </Col>
          </Row>

          <Row className='justify-center mb-4 xl:mb-12'>
            <NewShippingLayoutVolumetricError />
            <NewShippingLayoutWeightError />
            <NewShippingLayoutEdgeError />
            <Col col='12' lg='6' xl='6'>
              <NewShippingLayoutCurrentItemSizeButtonsMulti />
            </Col>
            <Col col='12' lg='6' xl='6'>
              <Row>
                <Col col='12'>
                  <NewShippingLayoutCurrentItemShippingMulti />
                </Col>
                <Col col='12'>
                  <NewShippingLayoutCurrentItemSizeBoxMulti />
                </Col>
              </Row>
            </Col>
          </Row>

          <Row className='mb-12 xl:mb-0'>
            <Col col='12' lg='12'>
              <p className={styles.infoText}>
                - Carga mal notificada será retenida y puede llegar al bloqueo
                de la cuenta.
              </p>
              <p className={styles.infoText}>
                * Peso máximo de 16 kg y 60 cm por arista, si se exceden los
                valores, estos se autocorrigen.
              </p>
              <p className={styles.infoText}>
                * Los tamaños estandarizados son seleccionados según el mayor
                valor entre peso físico (kg) y volumétrico
                (largo*ancho*alto/4.000)
              </p>
            </Col>
          </Row>

          <Row className='mb-12 xl:mb-6'>
            <Col col='12'>
              <h1 className={styles.title}>Tipo de servicio</h1>
              <p className={styles.text}>
                Selecciona el tipo de envío que necesitas
              </p>
            </Col>
          </Row>
          <Row className='mb-4 xl:mb-4'>
            <Col col='12' lg='6'>
              <NewShippingLayoutInfoBox
                title={
                  <>
                    Los tiempos de entrega comienzan una vez que recibimos tu
                    envío en el{' '}
                    <span className={styles.orangeText}>
                      Punto Blue Express
                    </span>
                    . Te recordamos entregar tu pedido antes de las 16 hrs, si
                    lo realizas posterior al horario se suman 24 hrs. adicional
                    al servicio.
                  </>
                }
              />
            </Col>
            <Col col='12' lg='6'>
              <NewShippingLayoutService />
            </Col>
          </Row>
        </NewShippingLayoutPackageProvider>
      </TabContent>
    </Tab>
  );
}
