import { FC } from 'react';
import { Container, Row, Col } from '@bx-design/react-grid';

import successImage from 'images/new-shipping/payment-success.png';
import globoalert from 'images/globoalert.png';
import { PaymentResponseType } from 'types/payment';
import styles from './title.module.scss';

type Props = {
  data: PaymentResponseType;
};

const PaymentTitle: FC<Props> = ({ data }) => {
  return (
    <div className={styles.section}>
      <Container>
        {data?.status !== 'REFUNDED' && (
          <Row className='xl:justify-center mb-6'>
            <Col col='12' xl='3'>
              <img
                src={successImage}
                alt='Muchas gracias'
                className={styles.titleImg}
              />
            </Col>
          </Row>
        )}

        <Row>
          <Col md='8' col='12' className='ml-[16.66666667%]'>
            {data?.status !== 'REFUNDED' ? (
              <>
                <h1 className={styles.title}>¡Muchas gracias!</h1>
                <h2 className={styles.subTitle}>
                  Ya estás listo para hacer tus envíos
                </h2>
                <div className={styles.infoContainer}>
                  <div className={styles.infoContainerText}>
                    {data.paymentMethod === 'RECEIVER' ? (
                      <p>
                        {' '}
                        Has escogido la opción “pago por destinatario”. <br />{' '}
                        Por lo tanto, el destinatario de tu envío lo pagará al
                        momento de recibirlo.
                      </p>
                    ) : (
                      <>
                        <p>
                          Te recordamos que, para procesar el envío a tu
                          destinatario, debes llevar el paquete al punto blue
                          Express seleccionado en un período máximo de{' '}
                          <b>5 días.</b>
                        </p>
                        <p>
                          {' '}
                          Expirado el plazo de envío, las ordenes serán anuladas
                          automaticamente.
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className={styles.center}>
                <img
                  src={globoalert}
                  alt='Globo Alert'
                  className={styles.img}
                />
                <h1 className={styles.title}>
                  No pudimos procesar tu orden de pago
                </h1>
                <div className={styles.infoContainer}>
                  <div className={styles.infoContainerText}>
                    <p>Ocurrió un problema al procesar tu pago</p>
                  </div>
                </div>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PaymentTitle;
