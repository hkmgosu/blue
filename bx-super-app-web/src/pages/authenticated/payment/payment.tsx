import PaymentBody from 'components/authenticated/payment/body';
import BoxSad from 'components/icons/box-sad';
import { Page } from 'components/layout';
import { Spinner } from 'components/ui-bx/spinner';
import { useGetEmissionByTransactionId } from 'hooks/use-get-emission-by-transaction-id';
import { useGetPayment } from 'hooks/use-get-payment';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { sendEvent } from 'utils/gtm';
import { LocationShippingType } from 'utils/shippingType';
import {
  initiateSocket,
  disconnectSocket,
  subscribeToPayment,
} from 'utils/socket-io';

export type ParamType = {
  id: string;
};
function PaymentResume(): JSX.Element {
  const { id } = useParams<ParamType>();
  const { isLoading, isError, data } = useGetPayment(id);
  const { data: emission } = useGetEmissionByTransactionId(id);
  const history = useHistory();
  const [paymentStatus, setPaymentStatus] = useState(data);
  const [isLoadingWs, setLoadingWs] = useState(true);

  useEffect(() => {
    if (!isLoading && !data) {
      history.push('/not-found');
    }
    if (!isLoading && data) {
      const { originService } = data;

      let subpath =
        LocationShippingType.massive === originService
          ? 'masivo_ok'
          : LocationShippingType.multi === originService
          ? 'multi_ok'
          : 'unitario_ok';

      history.push('/payment-order/' + id + '/' + subpath);
    }
  }, [data, history, isLoading, id]);

  useEffect(() => {
    if (!isLoading && data) {
      const { paymentMethod, status } = data;
      if (paymentMethod === 'BANCOESTADO' && status !== 'PAID') {
        const timer = setInterval(() => {
          // eslint-disable-next-line no-console
          console.log('30 second has passed');
          setPaymentStatus(
            Object.assign({}, data, {
              status: 'REFUNDED',
            })
          );
          setLoadingWs(false);
          clear();
        }, 30000);
        initiateSocket(id);
        subscribeToPayment((_fromServer: any) => {
          setPaymentStatus(
            Object.assign({}, data, {
              status: _fromServer.status ? 'PAID' : status,
            })
          );
          setLoadingWs(false);
          disconnectSocket();
        });
        const clear = (): void => {
          disconnectSocket();
          clearInterval(timer);
        };

        return clear;
      } else {
        setPaymentStatus(data);
        setLoadingWs(false);
      }
    }
  }, [data, isLoading, id, setPaymentStatus]);

  useEffect(() => {
    if (!data || !emission) return;

    sendEvent({
      event: 'purchase',
      affiliation: 'Superapp',
      coupon: data.promotionalCode,
      currency: 'CLP',
      transaction_id: id, // Transaction ID
      shipping: emission.shipping_price,
      value: emission.price, // dinero costo total del envío con iva
      tax: emission.tax, // iva
      items: [],
      //   items: [{
      //     item_id: 'SKU_12345',  -> numero OS
      //     item_name: 'jeggings', -> tipo de envio
      //     coupon: 'SUMMER_FUN', -> upon descuento si existe
      //     discount: 2.22, -> cantidad de dinero de descuento
      //     affiliation: 'Google Store', -> SuperApp
      //     item_brand: 'Gucci', -> no
      //     item_category: 'pants', ->
      //     item_variant: 'black', -> no
      //     price: 9.99, -> dinero costo total del envío
      //     currency: 'USD', -> CLP
      //     quantity: 1 -> cantidad de envíos dentro de la transacción
      //   }],
    });
  }, [data, emission, id]);

  return (
    <Page title='Payment Resume' description='BlueEnvío'>
      {(isLoading && isLoadingWs) || !paymentStatus ? (
        <SpinnerContainer>
          <Spinner variant='secondary' />
          <h2>Cargando pago...</h2>
        </SpinnerContainer>
      ) : isError ? (
        <>
          <SpinnerContainer>
            <BoxSad />
            <h2>Ups! ha ocurrido un error</h2>
          </SpinnerContainer>
        </>
      ) : (
        !isLoading &&
        !isLoadingWs &&
        data && (
          <PaymentBody
            data={data.status !== 'PAID' ? paymentStatus : data}
            transactionId={id}
          />
        )
      )}
    </Page>
  );
}

const SpinnerContainer = styled.div`
  margin-top: 100px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export default PaymentResume;
