import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col } from '@bx-design/react-grid';
import { Modal, ModalBody } from 'components/ui-bx/modal';
import { Card, CardBody } from 'components/ui-bx/card';
import { Button } from 'components/ui-bx/button';

import styles from './info-modal.module.scss';
import imgUnitary from 'images/unitario.jpg';
import imgMulti from 'images/enviovarios.jpg';
import { useRepayEmission } from 'emission-lib/hooks/repay';
import imgMassive from 'images/masivo.jpg';
import type {
  PriceQuoteCommuneType,
  PriceQuoteRegionType,
  PriceQuoteShippingBxServiceType,
  PriceQuoteSizeType,
} from 'atoms/price-quote/types';
import type { UseReturnQuoteType } from 'types/pricing';
import { EmissionStoreType } from 'emission-lib/types';
import { usePyme } from 'contexts/pyme/pyme-context';

type ModalProps = {
  isOpen: boolean;
  destinyCommune: PriceQuoteCommuneType;
  destinyRegion: PriceQuoteRegionType;
  originCommune: PriceQuoteCommuneType;
  originRegion: PriceQuoteRegionType;
  package: {
    bxShippingService: PriceQuoteShippingBxServiceType;
    sizes: {
      width: number;
      length: number;
      height: number;
      weight: number;
    };
    size: PriceQuoteSizeType;
  };
  price: UseReturnQuoteType | undefined;
  onClose: () => void;
};

function InfoModal({ isOpen, ...props }: ModalProps): JSX.Element {
  const history = useHistory();
  const [, setRepayEmissionData] = useRepayEmission();
  const { defaultPyme } = usePyme();

  const handleClick = useCallback(
    (path: string) => {
      const appraisalToEmission: EmissionStoreType = {
        billingType: 'INVOICE',
        discount: 0,
        emitter: {
          pyme_id: defaultPyme ? defaultPyme.id : '',
          pyme_name: defaultPyme ? defaultPyme.social_reason : '',
          email: '',
          phone: '',
        },
        origin: {
          address: {
            city: '',
            commune: {
              base_name: props.originCommune.base_name,
              name: props.originCommune.name,
              code: props.originCommune.code,
              base_post: props.originCommune.base_post,
              zone: props.originCommune.zone,
              location_code: props.originCommune.location_code,
            },
            complement: '',
            country: '',
            depto: '',
            geolocation: {
              latitude: 0,
              longitude: 0,
            },
            office: '',
            reference: '',
            region: {
              name: props.originRegion.name,
              country: props.originRegion.country,
              region_iso_3166: props.originRegion.region_iso_3166,
              region_number: props.originRegion.region_number,
            },
            street: '',
            street_number: '',
          },
          isPickup: false,
          agency_id: '',
          agency_name: '',
        },
        promotion_code: '',
        promotion_id: '',
        refund: {
          address: {
            city: '',
            commune: {
              base_name: '',
              name: '',
              code: '',
              base_post: '',
              zone: '',
              location_code: '',
            },
            complement: '',
            country: '',
            depto: '',
            geolocation: {
              latitude: 0,
              longitude: 0,
            },
            office: '',
            reference: '',
            region: {
              name: '',
              country: 0,
              region_iso_3166: '',
              region_number: '',
            },
            street: '',
            street_number: '',
          },
          isPickup: false,
          agency_id: '',
          agency_name: '',
        },
        save_frequent_origin: false,
        shipping: [
          {
            destiny: {
              address: {
                city: '',
                commune: {
                  base_name: props.destinyCommune.base_name,
                  name: props.destinyCommune.name,
                  code: props.destinyCommune.code,
                  base_post: props.destinyCommune.base_post,
                  zone: props.destinyCommune.zone,
                  location_code: props.destinyCommune.location_code,
                },
                complement: '',
                country: '',
                depto: '',
                geolocation: {
                  latitude: 0,
                  longitude: 0,
                },
                office: '',
                reference: '',
                region: {
                  name: props.destinyRegion.name,
                  country: props.destinyRegion.country,
                  region_iso_3166: props.destinyRegion.region_iso_3166,
                  region_number: props.destinyRegion.region_number,
                },
                street: '',
                street_number: '',
              },
              agency_id: '',
              agency_name: '',
              isPickup: false,
            },
            frequent_alias_client: undefined,
            frequent_alias_package: undefined,
            receiver: {
              name: '',
              lastName: '',
              email: '',
              phone: '',
              rut: '',
            },
            package: [
              {
                content: '',
                dangerous_merchandise: false,
                package_sizes: props.package.sizes,
                size: props.package.size,
                shipping_service: {
                  codeOrigin: props.price ? props.price.codeOrigin : null,
                  codeDestination: props.price
                    ? props.price?.codeDestination
                    : null,
                  price: props.price ? props.price.price : 0,
                  weight: props.price ? props.price.weight : 0,
                  service: props.package.bxShippingService,
                  sla: props.price ? props.price.sla : 0,
                },
                tax: 0,
                total_value: 0,
                warranty: false,
                warranty_bill_number: '',
                warranty_extended: 0,
                warranty_value: 0,
              },
            ],
            save_frequent_client: false,
            save_frequent_package: false,
            save_refund_address: false,
          },
        ],
        shipping_price: 0,
        tax: 0,
        terms_and_conditions_accepted: false,
        terms_and_conditions_accepted_date: undefined,
        total_price: 0,
        warranty: 0,
        withPromotion: false,
        emission_type: '',
      };
      if (path) {
        setRepayEmissionData(appraisalToEmission);
        history.push(path);
      }
    },
    [history, setRepayEmissionData, props, defaultPyme]
  );
  return (
    <Modal isOpen={isOpen} size={'xl'} toggle={() => props.onClose()} centered>
      <ModalBody>
        <Row>
          <Col col='12'>
            <h3 className={styles.mainTitle}>Selecciona tu tipo de envío</h3>
            <div className={styles.mainText}>
              ¡Tienes seleccionado <b>envío unitario!</b>. <br /> Recuerda que
              tienes la opción de realizar mas de un envío. Te invitamos a
              probar de 2 a 5 envíos o carga masiva.
            </div>
          </Col>
        </Row>
        <Row className='xl:items-stretch xl:justify-center'>
          <Col col='12' xl='4'>
            <Card>
              <CardBody>
                <div className={styles.wrapper}>
                  <h3 className={styles.title}>Envío unitario</h3>
                  <div className={styles.box}>
                    <div className={styles.imageBox}>
                      <img
                        className={styles.img}
                        src={imgUnitary}
                        alt='Envío unitario'
                      />
                    </div>
                  </div>
                  <div className={styles.text}>
                    Selecciona para crear un envío de forma manual. Con un
                    destino y origen y 1 pedido.
                  </div>
                  <div className={styles.box}>
                    <Button
                      onClick={() => handleClick('/new-shipping/unitary')}
                    >
                      Realizar envío
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col col='12' xl='4' className='hidden xl:block'>
            <Card>
              <CardBody>
                <div className={styles.wrapper}>
                  <h3 className={styles.title}>2 a 5 envíos</h3>
                  <div className={styles.box}>
                    <div className={styles.imageBox}>
                      <img
                        className={styles.img}
                        src={imgMulti}
                        alt='2 a 5 envíos'
                      />
                    </div>
                  </div>
                  <div className={styles.text}>
                    Selecciona para crear más de 1 envío, cada uno con 1 origen,
                    1 destinatario , 1 pedido.
                  </div>
                  <div className={styles.box}>
                    <Button onClick={() => handleClick('/new-shipping/multi')}>
                      Realizar envíos
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col col='12' xl='4' className='hidden xl:block'>
            <Card>
              <CardBody>
                <div className={styles.wrapper}>
                  <h3 className={styles.title}>Carga masiva</h3>
                  <div className={styles.box}>
                    <div className={styles.imageBox}>
                      <img
                        className={styles.img}
                        src={imgMassive}
                        alt='Carga masiva'
                      />
                    </div>
                  </div>
                  <div className={styles.text}>
                    Selecciona para importar entregas de 6 a 50 envíos, en una
                    hoja de cálculo excel. Puedes descargar la plantilla antes
                    de importar.
                  </div>
                  <div className={styles.box}>
                    <Button
                      onClick={() => handleClick('/new-shipping/massive')}
                    >
                      Importar envíos
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
}

export default InfoModal;
