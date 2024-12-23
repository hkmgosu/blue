import { createContext, FC, useCallback, useContext, useMemo } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { AxiosResponse } from 'axios';

import { usePaymentApi } from 'hooks/use-payment-api';
import type {
  AuthorizeTransactionType,
  ConfirmInscriptionRequestType,
  PaymentResponseType,
  PaymentStateType,
  WebpayPaymentRequestType,
} from 'types/payment';

export type DispatchType = {
  addInscription: () => Promise<string | undefined>;
  confirm: (token: string) => Promise<void>;
  setCards: () => void;
  deleteCard: (id: string) => Promise<void>;
  OneClickPay: (
    id: string,
    request: AuthorizeTransactionType
  ) => Promise<AxiosResponse>;
  webPay: (request: WebpayPaymentRequestType) => Promise<AxiosResponse>;
  confirmWebpay: (
    request: ConfirmInscriptionRequestType
  ) => Promise<AxiosResponse>;
  setPayment: (payment: PaymentResponseType) => void;
  closeError: () => void;
};

const RegisterContextState = createContext({} as PaymentStateType);
const RegisterContextDispatch = createContext({} as DispatchType);

const PaymentProvider: FC = (props) => {
  const {
    isInitializing,
    isConfirming,
    loadingCards,
    registered_cards,
    isRemovingInscription,
    payment,
    showError,
    newInscription,
    confInscription,
    setCards,
    deleteCard,
    OneClickPay,
    webPay,
    confirmWebpay,
    setPayment,
    closeError,
  } = usePaymentApi();

  const addInscription = useCallback(async () => {
    const res = await newInscription();
    if (res.status === 404) {
      toast.error('Ocurrió un error, inténtelo más tarde', {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      return res.data.url;
    }
  }, [newInscription]);
  const states = useMemo(
    () => ({
      isInitializing,
      isConfirming,
      registered_cards,
      loadingCards,
      isRemovingInscription,
      payment,
      showError,
    }),
    [
      isInitializing,
      isConfirming,
      registered_cards,
      loadingCards,
      isRemovingInscription,
      payment,
      showError,
    ]
  );
  const history = useHistory();
  const confirm = useCallback(
    async (token: string) => {
      await confInscription(token);
      history.push('/account');
    },
    [confInscription, history]
  );
  const values = useMemo(
    () => ({
      addInscription,
      confirm,
      setCards,
      deleteCard,
      OneClickPay,
      webPay,
      confirmWebpay,
      setPayment,
      closeError,
    }),
    [
      addInscription,
      confirm,
      setCards,
      deleteCard,
      OneClickPay,
      webPay,
      confirmWebpay,
      setPayment,
      closeError,
    ]
  );

  return (
    <RegisterContextState.Provider value={states}>
      <ToastContainer />
      <RegisterContextDispatch.Provider value={values} {...props} />
    </RegisterContextState.Provider>
  );
};

const usePaymentState = (): PaymentStateType => {
  const context = useContext(RegisterContextState);
  if (!context) {
    throw new Error('usePaymentState must be user within a PaymentProvider');
  }
  return context;
};

const usePaymentDispatch = (): DispatchType => {
  const context = useContext(RegisterContextDispatch);
  if (!context) {
    throw new Error('usePaymentDispatch must be used within a PaymentProvider');
  }
  return context;
};

export { PaymentProvider, usePaymentState, usePaymentDispatch };
