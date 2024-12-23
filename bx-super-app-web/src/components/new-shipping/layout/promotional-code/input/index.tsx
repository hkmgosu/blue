import { SyntheticEvent, useEffect, useState } from 'react';
import { Col, Row } from '@bx-design/react-grid';

import { Button } from 'components/ui-bx/button';
import { useGetPromotionalCode } from 'hooks/promotional-code/use-get-promotional-code';
import styles from './styles.module.scss';
import cs from 'classnames';
import {
  useDiscount,
  usePromotionCode,
  usePromotionId,
  useWithPromotion,
} from 'emission-lib/hooks/promotion';
import {
  usePaymentMethod,
  usePromotionalCodeFraction,
  usePromotionalCodeFree,
  usePromotionalCodeResponse,
} from 'emission-lib/hooks/emission-state';
import NewShippingLayoutPromotionalCodeInputText from './input';
import { useEmitterPymeId } from 'emission-lib/hooks/emitter';
import { usePyme } from 'contexts/pyme/pyme-context';
import { ShippingTypeEnum } from 'api/promotional-code';
import { useLocation } from 'react-router-dom';
import { useAtom } from 'jotai';
import { totalPriceAtom } from 'emission-lib/hooks/pricing/use-total-price';
import { originAddressCommuneAtom } from 'emission-lib/hooks/origin/use-origin-address-commune';
import { shippingsFocusAtom } from 'emission-lib/store';
import { PaymentMethod } from 'types/payment';

export default function NewShippingLayoutPromotionalCodeInput(): JSX.Element {
  const [shippingType, setShippingType] = useState<ShippingTypeEnum>(
    ShippingTypeEnum.NONE
  );
  const [, setDiscount] = useDiscount();
  const [, setWithPromotion] = useWithPromotion();
  const [, setPromotionId] = usePromotionId();
  const [promotionCode, setPromotionCode] = usePromotionCode();
  const [, setPromotionalCodeResponse] = usePromotionalCodeResponse();
  const [, setPromotionCodeFraction] = usePromotionalCodeFraction();
  const [, setPromotionCodeFree] = usePromotionalCodeFree();
  const [, setPaymentMethod] = usePaymentMethod();
  const [pymeId] = useEmitterPymeId();
  const { pymeList } = usePyme();
  const location = useLocation();
  const [totalPrice] = useAtom(totalPriceAtom);
  const { mutate, promotionalCode, isLoading, isError, isSuccess } =
    useGetPromotionalCode();
  const [originAddress] = useAtom(originAddressCommuneAtom);
  const [shippings] = useAtom(shippingsFocusAtom);
  const [couponApplied, setCouponApplied] = useState(false);

  useEffect(() => {
    if (isSuccess && !isError && promotionalCode && promotionalCode.value) {
      promotionalCode.is_free_shipping && totalPrice === 0
        ? setPaymentMethod('free')
        : setPaymentMethod(
            !promotionalCode.paymentAvailable ||
              promotionalCode.paymentAvailable === PaymentMethod.ALL
              ? 'webpay'
              : (promotionalCode.paymentAvailable.toLowerCase() as Lowercase<PaymentMethod>)
          );
      setPromotionalCodeResponse(promotionalCode);
      setPromotionId(promotionalCode.id);
      setDiscount(promotionalCode.value);
      setPromotionCodeFraction(promotionalCode.is_fraction);
      setPromotionCodeFree(promotionalCode.is_free_shipping);
      setWithPromotion(true);
    } else {
      setPaymentMethod('webpay');
      setPromotionalCodeResponse(undefined);
    }
  }, [
    isSuccess,
    isError,
    promotionalCode,
    setPromotionId,
    setDiscount,
    setPromotionCodeFraction,
    setWithPromotion,
    setPaymentMethod,
    setPromotionCodeFree,
    setPromotionCode,
    totalPrice,
    setPromotionalCodeResponse,
  ]);

  useEffect(() => {
    if (isError) {
      setPromotionId('');
      setDiscount(0);
      setPromotionCodeFraction(false);
      setWithPromotion(false);
    }
  }, [
    isError,
    setPromotionId,
    setDiscount,
    setPromotionCodeFraction,
    setWithPromotion,
  ]);

  useEffect(() => {
    if (!isSuccess && !isError && !couponApplied) {
      setPromotionCode('');
      setPromotionId('');
      setDiscount(0);
      setPromotionCodeFraction(false);
      setWithPromotion(false);
    }
  }, [
    couponApplied,
    isError,
    isSuccess,
    setDiscount,
    setPromotionCode,
    setPromotionCodeFraction,
    setPromotionId,
    setWithPromotion,
  ]);

  useEffect(() => {
    if (location.pathname) {
      switch (location.pathname) {
        case '/new-shipping/multi':
          setShippingType(ShippingTypeEnum.INTERMEDIATE);
          break;
        case '/new-shipping/massive':
          setShippingType(ShippingTypeEnum.MASSIVE);
          break;
        case '/new-shipping/unitary':
        default:
          setShippingType(ShippingTypeEnum.UNITARY);
          break;
      }
    }
  }, [location.pathname]);

  useEffect(() => {
    /**
     * @todo descubrir porque el proveedor de montaje no restablece este estado
     * @todo verificar si existe la vulnerabilidad de declarar desde nivel frontend que la orden es free
     */
    setPromotionCodeFree(false);
  }, [setPromotionCodeFree]);

  const handleSubmit = (e: SyntheticEvent): void => {
    e.preventDefault();
    const pymeRut = pymeList?.find((p) => p.id === pymeId)?.rut;
    const destiny = shippings[0].destiny;

    setCouponApplied(true);

    mutate({
      promotionalCode: promotionCode,
      pymeRut: pymeRut ? pymeRut : '',
      shippingType: shippingType,
      codeDestiny: destiny.isPickup
        ? destiny.address.commune.location_code
        : destiny.address.commune.base_post,
      codeOrigin: originAddress.location_code,
      talla: shippings[0].package[0].size,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Row>
        <Col col='12'>
          <div className={styles.box}>
            <div className={styles.boxLeft}>
              <NewShippingLayoutPromotionalCodeInputText />
              <div
                className={cs(
                  styles.discountCode,
                  { [styles.error]: isError },
                  { [styles.success]: isSuccess }
                )}
              >
                {isSuccess && 'Cupón de descuento aplicado.'}
                {isError && 'Cupón no válido.'}
              </div>
            </div>
            <div className={styles.boxRight}>
              <Button type='submit' isLoading={isLoading} disabled={isLoading}>
                Aplicar
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </form>
  );
}
