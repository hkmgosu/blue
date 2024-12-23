import { useEffect, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { webpayReturnUri, paymentGenericReturnUri } from 'config';

import {
  initWebpayTransaction,
  initBancoestadoTransaction,
  authorizeTransaction,
  createReceiverPay,
  createFreePay,
} from 'api/payment';
import { useCreditCards } from 'hooks/use-credit-cards';
import {
  useEmissionId,
  usePaymentMethod,
} from 'emission-lib/hooks/emission-state';
import {
  usePaymentStateError,
  usePaymentStateIsError,
  usePaymentStateIsLoading,
  usePaymentStateIsSuccess,
} from 'emission-lib/hooks/payment-state';
import { useTotalPrice } from 'emission-lib/hooks/pricing';
import { useCreateEmissionIsSuccess } from 'emission-lib/hooks/create-emission-state';
import { useEmitterPymeId } from 'emission-lib/hooks/emitter';
import { usePromotionCode } from 'emission-lib/hooks/promotion';
import { getShippingType } from 'utils/shippingType';
import { useEmissionType } from 'emission-lib/hooks/emission-state';

function NewShippingLayoutPaymentSubmit(): JSX.Element {
  const location = useLocation();
  const history = useHistory();
  const [emissionType, setEmissionType] = useEmissionType();
  const { data: dataCards } = useCreditCards();
  const [emissionId] = useEmissionId();
  const [paymentMethod] = usePaymentMethod();
  const [isEmissionSuccess] = useCreateEmissionIsSuccess();
  const [, setIsLoading] = usePaymentStateIsLoading();
  const [, setIsError] = usePaymentStateIsError();
  const [, setIsSuccess] = usePaymentStateIsSuccess();
  const [, setError] = usePaymentStateError();
  const [pymeId] = useEmitterPymeId();
  const [promotionalCode] = usePromotionCode();
  const totalPrice = useTotalPrice();
  const shippingType = getShippingType(location.pathname);

  const handleFreePay = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    setIsSuccess(false);
    setError(null);
    try {
      const res = await createFreePay({
        pymeId: pymeId,
        paymentId: emissionId,
        originCode: shippingType,
        amount: Math.round(totalPrice),
        promotionalCode: promotionalCode,
      });
      if (res.status === 200 || res.status === 201) {
        setIsSuccess(true);
        history.push(`/payment-order/${emissionId}`);
      }
    } catch (error: any) {
      setIsSuccess(true);
      setError(error?.message);
      setIsError(true);
      setIsLoading(false);
    }
  }, [
    setError,
    setIsError,
    setIsLoading,
    setIsSuccess,
    emissionId,
    promotionalCode,
    pymeId,
    totalPrice,
    history,
    shippingType,
  ]);

  const handleReceiverPay = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    setIsSuccess(false);
    setError(null);
    try {
      const res = await createReceiverPay({
        pymeId: pymeId,
        paymentId: emissionId,
        originCode: shippingType,
        amount: Math.round(totalPrice),
        promotionalCode: promotionalCode,
      });
      if (res.status === 200 || res.status === 201) {
        setIsSuccess(true);
        history.push(`/payment-order/${emissionId}`);
      }
    } catch (error: any) {
      setIsSuccess(true);
      setError(error.message);
      setIsError(true);
      setIsLoading(false);
    }
  }, [
    setError,
    setIsError,
    setIsLoading,
    setIsSuccess,
    emissionId,
    promotionalCode,
    pymeId,
    totalPrice,
    history,
    shippingType,
  ]);

  const handleWebpay = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    setIsSuccess(false);
    setError(null);
    try {
      const res = await initWebpayTransaction({
        pymeId: pymeId,
        paymentId: emissionId,
        originCode: shippingType,
        amount: Math.round(totalPrice),
        returnUrl: webpayReturnUri,
        promotionalCode: promotionalCode,
      });
      if (res.status === 200 || res.status === 201) {
        setIsSuccess(true);
        window.location.assign(res.data.url);
      }
    } catch (err: any) {
      setError(err.message);
      setIsError(true);
      setIsLoading(false);
    }
  }, [
    emissionId,
    setError,
    setIsError,
    setIsLoading,
    setIsSuccess,
    totalPrice,
    promotionalCode,
    pymeId,
    shippingType,
  ]);

  const handleBancoestado = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    setIsSuccess(false);
    setError(null);
    try {
      const res = await initBancoestadoTransaction({
        pymeId: pymeId,
        paymentId: emissionId,
        originCode: shippingType,
        returnUrl: paymentGenericReturnUri,
      });

      if (res.status === 200 || res.status === 201) {
        setIsSuccess(true);
        window.location.assign(res.data.url);
      }
    } catch (err: any) {
      setError(err.message);
      setIsError(true);
      setIsLoading(false);
    }
  }, [
    emissionId,
    setError,
    setIsError,
    setIsLoading,
    setIsSuccess,
    pymeId,
    shippingType,
  ]);

  const handleOneclick = useCallback(
    async (ccId: string) => {
      setIsLoading(true);
      setIsError(false);
      setIsSuccess(false);
      setError(null);
      try {
        const res = await authorizeTransaction(ccId, {
          paymentId: emissionId,
          originCode: shippingType,
          amount: Math.round(totalPrice),
          installmentsNumber: 0,
          pymeId: pymeId,
          promotionalCode: promotionalCode,
        });

        if (res.status === 200 || res.status === 201) {
          setIsSuccess(true);

          if (res.data) {
            history.push(`/payment-order/${res.data.buy_order}`);
          }
        }
      } catch (err: any) {
        setError(err.message);
        setIsError(true);
        setIsLoading(false);
      }
    },
    [
      emissionId,
      setError,
      setIsError,
      setIsLoading,
      setIsSuccess,
      totalPrice,
      history,
      promotionalCode,
      pymeId,
      shippingType,
    ]
  );

  useEffect(() => {
    setEmissionType(getShippingType(location.pathname));
    if (isEmissionSuccess && paymentMethod === 'webpay') {
      handleWebpay();
    }
    if (isEmissionSuccess && paymentMethod === 'bancoestado') {
      handleBancoestado();
    }
    if (isEmissionSuccess && paymentMethod === 'oneclick' && dataCards) {
      handleOneclick(dataCards[0].id);
    }
    if (isEmissionSuccess && paymentMethod === 'receiver') {
      handleReceiverPay();
    }
    if (isEmissionSuccess && paymentMethod === 'free') {
      handleFreePay();
    }
  }, [
    isEmissionSuccess,
    paymentMethod,
    handleWebpay,
    handleBancoestado,
    dataCards,
    handleOneclick,
    handleReceiverPay,
    handleFreePay,
    setEmissionType,
    location,
    emissionType,
  ]);

  return <></>;
}

export default NewShippingLayoutPaymentSubmit;
