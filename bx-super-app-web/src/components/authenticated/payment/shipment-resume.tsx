import { useEffect } from 'react';
import { Container, Row, Col } from '@bx-design/react-grid';
import { BxExclamation } from '@bx-design/react-icons';

import { Card, CardBody } from 'components/ui-bx/card';
import PaymentSizeBox from './size-box';
import { useGetEmissionByTransactionId } from 'hooks/use-get-emission-by-transaction-id';
import { useGetResumeEmissionById } from 'hooks/use-get-resume-emission-by-id';
import styles from './shipment-resume.module.scss';
import { PaymentResponseType } from 'types/payment';
import { sendEvent } from 'utils/gtm';
import { LocationShippingType } from 'utils/shippingType';

type Props = {
  transactionId: string;
  data: PaymentResponseType;
};

function ShipmentResume({ transactionId, data }: Props): JSX.Element {
  const { isLoading: isLoadingEmission, data: emission } =
    useGetEmissionByTransactionId(transactionId);
  const { isLoading: isLoadingResume, data: resume } =
    useGetResumeEmissionById(transactionId);

  useEffect(() => {
    if (emission && resume) {
      const coupon = emission.promotion_code
        ? { coupon: emission.promotion_code }
        : undefined;
      sendEvent({
        event: 'purchase',
        ecommerce: {
          transaction_id: transactionId,
          value: emission.price,
          tax: emission.tax,
          currency: 'CLP',
          ...coupon,
          items: emission.shipping.map(() => {
            return {
              name: 'BX-ENVIO-PYME2C',
              quantity: 1,
            };
          }),
        },
      });
    }
  }, [emission, resume, transactionId, data]);

  if (isLoadingEmission && isLoadingResume) {
    return <div className={styles.section}>Loading ...</div>;
  }

  return (
    <div className={styles.section}>
      <Container>
        <Row>
          <Col>
            <h2 className={styles.title}>
              Detalles del envío{' '}
              {data.originService === LocationShippingType.massive
                ? 'Masivo'
                : data.originService === LocationShippingType.multi
                ? 'Multiple'
                : 'Unitario'}
            </h2>
          </Col>
        </Row>
        <Row>
          <Col col='12' md='3'>
            <div className={styles.relative}>
              <Card>
                <CardBody>
                  <div className={styles.center}>
                    <PaymentSizeBox />
                  </div>
                </CardBody>
              </Card>
              {emission?.status === 'REJECTED' && (
                <div className={styles.alert}>
                  <div className={styles.containerExclamation}>
                    <BxExclamation />
                  </div>
                </div>
              )}
            </div>
          </Col>
          <Col col='12' md='9'>
            <Row>
              <Col col='6'>
                <h3 className={styles.subTitle}>Encomiendas</h3>
                {resume?.sizes.map((data, index) => {
                  return (
                    <div className={styles.content} key={index}>
                      Tamaño {data.name}
                    </div>
                  );
                })}
              </Col>
              <Col col='6'>
                <h3 className={styles.subTitle}>Cantidad</h3>
                {resume?.sizes.map((data, index) => {
                  return (
                    <div className={styles.content} key={index}>
                      {data.count}
                    </div>
                  );
                })}
              </Col>
              <Col col='6'>
                <h3 className={styles.subTitle}>Dirección de destino</h3>
                <Row>
                  <div className={styles.regionCounterContainer}>
                    {resume?.regions.map((data, index) => {
                      return (
                        <div className={styles.content} key={index}>
                          {data.count}
                        </div>
                      );
                    })}
                  </div>
                  <Col col='4'>
                    {resume?.regions.map((data, index) => {
                      return (
                        <div className={styles.content} key={index}>
                          {data.name}
                        </div>
                      );
                    })}
                  </Col>
                </Row>
              </Col>
              <Col col='6'>
                <h3 className={styles.subTitle}>Tipo de servicio</h3>
                {resume?.services.map((data, index) => {
                  return (
                    <div className={styles.content} key={index}>
                      {/* {data === 'NEXT DAY' ? '48' : '24'} hrs. */}
                      Blue Express
                    </div>
                  );
                })}
              </Col>
            </Row>
          </Col>
          <Col col='5'></Col>
          <Col col='5'></Col>
        </Row>

        <Row>
          <div className={styles.separatorLine} />
        </Row>
      </Container>
    </div>
  );
}

export default ShipmentResume;
