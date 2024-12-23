import { Container, Row, Col } from '@bx-design/react-grid';
import { BxCreditCard, BxFile, BxInfo, BxMoney } from '@bx-design/react-icons';

import styles from './payment-detail.module.scss';
import { Button, ButtonLink } from 'components/ui-bx/button';
import { PaymentResponseType } from 'types/payment';
import { useGetEmissionByTransactionId } from 'hooks/use-get-emission-by-transaction-id';
import PaymentRepayButton from './repay-button';
import { useEffect, useState } from 'react';

type Props = {
  data: PaymentResponseType;
  transactionId: string;
};

function PaymentDetail({ data, transactionId }: Props): JSX.Element {
  const [isReady, setIsReady] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const { data: emission, refetch } = useGetEmissionByTransactionId(
    transactionId,
    !isReady,
    enabled
  );
  const [urlFile, setUrlFile] = useState<string | null>(null);

  useEffect(() => {
    if (data?.status === 'REFUNDED') {
      setEnabled(false);
    } else {
      if (emission?.emission_file_url) {
        setIsReady(true);
        setUrlFile(emission.emission_file_url);
      } else {
        /**
         * @todo cancelar el fetch con status "REFUNDED"
         */
        refetch();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emission]);

  return (
    <section className={styles.section}>
      <Container>
        <Row>
          <Col>
            <h1 className={styles.title}>Detalles de pago</h1>
          </Col>
        </Row>
        {(data?.status === 'PAID' || data?.status === 'TOPAY') && (
          <>
            <Row className='my-4'>
              <div className={styles.containerDetail}>
                <BxFile />
                <h2 className={styles.subtitle}>
                  <b>N° de transacción </b> {data?.transactionId}
                </h2>
              </div>
            </Row>
            <Row className='my-4'>
              <div className={styles.containerDetail}>
                <BxCreditCard />
                <h2 className={styles.subtitle}>
                  <b>Medio de pago </b> {data?.paymentMethod}
                </h2>
              </div>
            </Row>
          </>
        )}

        <Row className='my-4'>
          <div className={styles.containerDetail}>
            <BxMoney />
            <h2 className={styles.subtitle}>
              <b>Monto </b> $
              {String(data?.amount).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')}
            </h2>
          </div>
        </Row>
        {(data?.status === 'PAID' || data?.status === 'TOPAY') && (
          <Row className='flex items-center justify-center'>
            <div className={styles.infoContainer}>
              <BxInfo size={20} />
              Te enviaremos un correo electrónico con los detalles del pedido,
              con la etiqueta incluída.
            </div>
          </Row>
        )}

        <Row>
          <div className={styles.buttonContainer}>
            {emission?.status &&
              !['REJECTED', 'REFUNDED'].includes(data?.status) && (
                <div>
                  {isReady && urlFile ? (
                    <Button href={urlFile} download='etiqueta.pdf'>
                      Descargar etiqueta
                    </Button>
                  ) : (
                    <Button isLoading disabled useLabelWithLoading>
                      Generando etiqueta
                    </Button>
                  )}
                </div>
              )}

            {emission?.shipping && emission?.shipping?.length === 1 && (
              <>
                {data?.status === 'PAID' || data?.status === 'TOPAY' ? (
                  <ButtonLink to='/new-shipping/unitary'>
                    Realizar otro envío
                  </ButtonLink>
                ) : (
                  <PaymentRepayButton
                    paymentId={transactionId}
                    to='/new-shipping/unitary'
                    newShippingType='UNITARY'
                  />
                )}
              </>
            )}

            {emission?.shipping &&
              emission?.shipping?.length > 1 &&
              emission?.shipping?.length <= 5 && (
                <>
                  {data?.status === 'PAID' || data?.status === 'TOPAY' ? (
                    <ButtonLink to='/new-shipping/multi'>
                      Realizar otro envío
                    </ButtonLink>
                  ) : (
                    <PaymentRepayButton
                      paymentId={transactionId}
                      to='/new-shipping/multi'
                      newShippingType='MULTI'
                    />
                  )}
                </>
              )}
            {emission?.shipping && emission?.shipping?.length > 5 && (
              <>
                {data?.status === 'PAID' || data?.status === 'TOPAY' ? (
                  <ButtonLink to='/new-shipping/massive'>
                    Realizar otro envío
                  </ButtonLink>
                ) : (
                  <PaymentRepayButton
                    paymentId={transactionId}
                    to='/new-shipping/massive'
                    newShippingType='MASSIVE'
                  />
                )}
              </>
            )}

            <ButtonLink to='/dashboard'>Ir a inicio</ButtonLink>
          </div>
        </Row>
      </Container>
    </section>
  );
}

export default PaymentDetail;
