import styles from 'components/new-shipping/layout/summary/summary-unitary-right-payment-method.module.scss';
import NewShippingLayoutInfoBox from 'components/new-shipping/layout/info-box';
import NewShippingLayoutSummaryUnitaryRightPaymentMethodTerms from 'components/new-shipping/layout/summary/summary-unitary-right-payment-method-terms';
// import NewShippingLayoutSummaryWebpayButton from 'components/new-shipping/layout/summary/webpay-button';
import NewShippingLayoutSummaryOneclickButton from 'components/new-shipping/layout/summary/oneclick-button';
import NewShippingLayoutSummaryReceiverPay from 'components/new-shipping/layout/summary/receiver-pay-button';

/**
 * Para botones nuevos los invito a reutilizar este componente,
 * con solo 2 parámetros se agrega un botón nuevo
 */
import { NewShippingLayoutSummaryPayButton } from 'components/new-shipping/layout/summary/pay-button';
import imageWebPayPlus from 'images/pay-methods/webpay-plus-image.png';
import imageBancoestado from 'images/pay-methods/banco-estado.png';

import { useShippingsAtom } from 'emission-lib/hooks/shipping';
import { useLocation } from 'react-router-dom';
import {
  usePromotionalCodeFree,
  usePromotionalCodeResponse,
} from 'emission-lib/hooks/emission-state';
import NewShippingLayoutSummaryFreePay from './free-pay-button';
import { useAtom } from 'jotai';
import { totalPriceAtom } from 'emission-lib/hooks/pricing/use-total-price';
import { PaymentMethod } from 'types/payment';
import { ShowAlert } from 'components/ui-bx/alert';

import { usePaymentStateIsError } from 'emission-lib/hooks/payment-state';
import { useCreateEmissionIsError } from 'emission-lib/hooks/create-emission-state';

const Buttons = {
  [PaymentMethod.WEBPAY]: (
    <NewShippingLayoutSummaryPayButton
      method='webpay'
      image={imageWebPayPlus}
    />
  ),
  [PaymentMethod.ONECLICK]: <NewShippingLayoutSummaryOneclickButton />,
  [PaymentMethod.FREE]: <NewShippingLayoutSummaryFreePay />,
  [PaymentMethod.RECEIVER]: <NewShippingLayoutSummaryReceiverPay />,
  [PaymentMethod.BANCOESTADO]: (
    <NewShippingLayoutSummaryPayButton
      method='bancoestado'
      image={imageBancoestado}
    />
  ),
};

function NewShippingLayoutSummaryUnitaryRightPaymentMethod(): JSX.Element {
  const [totalPrice] = useAtom(totalPriceAtom);
  const [shippings] = useShippingsAtom();
  const location = useLocation();
  const [errorPayment] = usePaymentStateIsError();
  const [errorEmission] = useCreateEmissionIsError();
  const notPickup = shippings.every(
    (shipping) => shipping.destiny.isPickup === false
  );
  const [isFree] = usePromotionalCodeFree();
  const [promotionalCodeResponse] = usePromotionalCodeResponse();

  const showDestinataryPay: boolean =
    (location.pathname === '/new-shipping/unitary' ||
      location.pathname === '/new-shipping/massive') &&
    notPickup;

  return (
    <div className={styles.content}>
      <div className={styles.wrapper}>
        {!promotionalCodeResponse?.paymentAvailable ||
        promotionalCodeResponse?.paymentAvailable === PaymentMethod.ALL ? (
          isFree && totalPrice === 0 ? (
            Buttons[PaymentMethod.FREE]
          ) : (
            <>
              {Buttons[PaymentMethod.WEBPAY]}
              {Buttons[PaymentMethod.ONECLICK]}
              {Buttons[PaymentMethod.BANCOESTADO]}
              {showDestinataryPay && Buttons[PaymentMethod.RECEIVER]}
            </>
          )
        ) : (
          Buttons[promotionalCodeResponse?.paymentAvailable]
        )}
      </div>

      <div className={styles.infoBox}>
        {errorPayment || errorEmission ? (
          <ShowAlert variant='danger' isOpen>
            Oh no ha fallado la transacción, intenta nuevmente.
          </ShowAlert>
        ) : (
          <NewShippingLayoutInfoBox
            title={
              <>
                Una vez seleccionado el método de pago, haz clic en el botón
                {'   '}
                <span style={{ color: 'orange' }}> “Pagar”</span>
              </>
            }
          />
        )}
      </div>

      <div className={styles.terms}>
        <NewShippingLayoutSummaryUnitaryRightPaymentMethodTerms />
        <p className={styles.extraTerms}>
          Una vez que das check aceptas los términos y condiciones, accediendo
          al pago.
        </p>
      </div>
    </div>
  );
}

export default NewShippingLayoutSummaryUnitaryRightPaymentMethod;
