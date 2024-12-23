import { useEffect, useState } from 'react';
import styles from './checkout-section.module.css';
import { Row, Col } from '@bx-design/react-grid';
import NewShippingFormSummaryBack from 'components/new-shipping/form/summary/back';
import NewShippingLayoutSummaryMultiRight from 'components/new-shipping/layout/summary/multi-right';
import { CheckoutDetail } from './checkout-detail';
import { Accordion } from 'components/ui-bx/accordion';
// import { Button } from 'components/ui-bx/button';
import { Card } from 'components/ui-bx/card';
import {
  // BxDownload,
  BxBox,
  BxPersonCircle,
  BxStore,
} from '@bx-design/react-icons';
import { tableToObject } from './utils';
import { useMassiveTable } from 'emission-lib/hooks/massive';
import { formatNumber } from 'utils/formatNumber';
import { useShippingsAtom } from 'emission-lib/hooks/shipping';
import { useShippingsTotal } from 'emission-lib/hooks/shipping/use-shippings-total';
import { useTotalPrice } from 'emission-lib/hooks/pricing';
import { ShippingStoreType, ShippingSizeType } from 'emission-lib/types';
import { usePyme } from 'contexts/pyme/pyme-context';
import { useOrigin } from 'emission-lib/hooks/origin';
import { sizeToMeasures } from 'components/new-shipping/utils/size-to-measures';

const groupProperty = (
  list: {
    [prop: string]: any;
  }[],
  property: string
): {
  [prop: string]: number;
} =>
  list.reduce<{
    [prop: string]: number;
  }>(
    (data, row) => ({
      ...data,
      [row[property].value]: (data[row[property].value] || 0) + 1,
    }),
    {}
  );

export function CheckoutSection(): JSX.Element {
  const { defaultPyme } = usePyme();
  const [massiveTable] = useMassiveTable();
  const [shipping, setShipping] = useShippingsAtom();
  const [show, setShow] = useState(true);
  const [origin] = useOrigin();
  const table = tableToObject(
    /**
     * @todo Eliminar filtro una vez cerrado el nuevo endpoint
     */
    (massiveTable?.data || []).filter(({ error }) => !error)
  );

  const groupRegion = Object.entries(groupProperty(table, 'region'));
  const groupSize = Object.entries(groupProperty(table, 'size'));

  const total = useTotalPrice();

  const totalDetail = useShippingsTotal();

  useEffect(() => {
    const [first] = shipping;
    const nextShipping = table.map(
      ({
        size: sizeRow,
        isPickup,
        descriptionContent,
        taxpayerId,
        name,
        lastName,
        email,
        phone,
        apartmentOffice,
        referenceHelp,
        metadata,
      }): ShippingStoreType => {
        const size = sizeRow.value.toUpperCase() as ShippingSizeType;
        const measures = sizeToMeasures[size];
        return {
          ...first,
          destiny: {
            ...first.destiny,
            address: {
              ...first.destiny.address,
              city: metadata.city,
              commune: metadata.commune,
              country: 'Chile',
              complement: apartmentOffice.value,
              depto: apartmentOffice.value,
              office: apartmentOffice.value,
              geolocation: metadata.geolocation,
              reference: referenceHelp.value,
              region: metadata.region,
              street: metadata.street,
              street_number: metadata.streetNumber,
            },
            agency_id: '',
            agency_name: '',
            isPickup: isPickup.value,
          },
          receiver: {
            name: name.value,
            lastName: lastName.value,
            email: email.value,
            phone: phone.value,
            rut: taxpayerId.value,
          },
          package: [
            {
              content: descriptionContent.value,
              dangerous_merchandise: false,
              package_sizes: {
                ...measures,
                weight: metadata.shippingService.weight,
              },
              shipping_service: metadata.shippingService,
              size,
              total_value: Math.round(metadata.shippingService.price),
              /**
               * Si la metadata.tax no se ha definido, se calcula desde el Front.
               */
              tax:
                Math.round(metadata.tax) ||
                Math.round(metadata.shippingService.price * 0.19),
              /**
               * Solo si el componente define warranty, se asocian los valores,
               * ya que estos se pueden definir como false desde Back.
               */
              ...(metadata.warranty
                ? {
                    warranty: metadata.warranty,
                    warranty_bill_number: metadata.warrantyBillNumber,
                    warranty_extended: metadata.warrantyExtended || 0,
                    warranty_value: metadata.warrantyValue,
                  }
                : {
                    warranty: false,
                    warranty_bill_number: '',
                    warranty_extended: 0,
                    warranty_value: 0,
                  }),
            },
          ],
        };
      }
    );
    /**
     * @todo desapalancar api de total de envios
     */
    setShipping(nextShipping);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Row>
      <Col col='12'>
        <Row>
          <Col col='12' xl='6' className='mb-12 xl:mb-0'>
            <Row>
              <Col col='12'>
                <Card>
                  <div className={styles.cardContainerLeft}>
                    <Accordion
                      show={show}
                      onChange={(show) => setShow(show)}
                      header={
                        <h3 className={styles.cardHeaderTitle}>
                          Resumen carga masiva
                        </h3>
                      }
                    >
                      <div className={styles.cardContent}>
                        <CheckoutDetail
                          data={[
                            {
                              label: 'Quien envía',
                              items: [
                                {
                                  icon: <BxPersonCircle size={15} />,
                                  label: defaultPyme?.social_reason,
                                },
                                {
                                  icon: <BxStore size={15} />,
                                  label: origin.agency_name,
                                },
                              ],
                            },
                            {
                              label: 'Destino',
                              items: [
                                {
                                  icon: <BxPersonCircle size={15} />,
                                  label: `${groupRegion.reduce(
                                    (total, [, value]) => total + value,
                                    0
                                  )} destinatarios`,
                                  description: groupRegion.map(
                                    ([prop, value]) => `- ${value} ${prop}`
                                  ),
                                },
                              ],
                            },
                            {
                              label: 'Encomienda',
                              items: [
                                {
                                  icon: <BxBox size={15} />,
                                  label: `${groupSize.reduce(
                                    (total, [, value]) => total + value,
                                    0
                                  )} encomiendas`,
                                  description: groupSize.map(
                                    ([prop, value]) =>
                                      `- ${value} tamaño ${prop}`
                                  ),
                                },
                              ],
                            },
                            {
                              label: 'Valor carga masiva',
                              descriptionAlignRight: true,
                              items: [
                                {
                                  label: 'Valor de envío: ',
                                  description: `$ ${formatNumber(
                                    totalDetail.price
                                  )}`,
                                },
                                {
                                  label: 'Garantía (0,6%): ',
                                  description: `$ ${formatNumber(
                                    totalDetail.warrantyValue
                                  )}`,
                                },
                                {
                                  label: 'Iva: ',
                                  description: `$ ${formatNumber(
                                    Math.floor(
                                      totalDetail.tax +
                                        totalDetail.warrantyValue * 0.19
                                    )
                                  )}`,
                                },
                              ],
                            },
                            {
                              label: 'Total',
                              description: `$ ${formatNumber(
                                Math.round(total)
                              )}`,
                              descriptionAlignRight: true,
                            },
                          ]}
                        ></CheckoutDetail>
                      </div>
                    </Accordion>
                  </div>
                </Card>
              </Col>
            </Row>
          </Col>

          <Col col='12' xl='6' className='mb-6 xl:mb-0'>
            {/* <div className={styles.spaceBottom}>
              <Card>
                <div className={styles.cardDownload}>
                  <div className={styles.cardDownloadContent}>
                    <h3 className={styles.cardDownloadTitle}>
                      Descarga tu planilla final
                    </h3>
                    <p className={styles.cardDownloadText}>
                      Si realizaste ediciones en línea, puedes descargar aquí tu
                      archivo modificado
                    </p>
                  </div>
                  <Button variant='outline' icon={<BxDownload />}>
                    Descarga archivo
                  </Button>
                </div>
              </Card>
            </div> */}
            <NewShippingLayoutSummaryMultiRight isMassive />
          </Col>

          <Col col='12' className='xl:hidden'>
            <NewShippingFormSummaryBack isMassive />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
