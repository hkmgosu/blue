import { useCallback, useReducer } from 'react';
import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';

import { inscriptionRedirectUri } from 'config';
import {
  initInscription,
  confirmInscription,
  getPaymentCards,
  removeInscription,
  authorizeTransaction,
  initWebpayTransaction,
  confirmWebpayTransaction,
} from 'api/payment/index';
import type {
  AuthorizeTransactionType,
  CardType,
  ConfirmInscriptionRequestType,
  PaymentResponseType,
  PaymentStateType,
  WebpayPaymentRequestType,
} from 'types/payment';
import type { ErrorResponseType } from 'types/error-response';

enum ActionEnum {
  SET_MESSAGE = 'SET_MESSAGE',
  FIELD = 'FIELD',
}

type ActionType =
  | { type: ActionEnum.SET_MESSAGE; payload: string }
  | {
      type: 'FIELD';
      fieldName: string;
      payload: boolean | CardType[] | ErrorResponseType | PaymentResponseType;
    };

const registerReducer = (
  state: PaymentStateType,
  action: ActionType
): PaymentStateType => {
  if (action.type === 'FIELD') {
    return { ...state, [action.fieldName]: action.payload };
  } else {
    return state;
  }
};

const initialState: PaymentStateType = {
  isInitializing: false,
  isConfirming: false,
  registered_cards: null,
  loadingCards: false,
  isRemovingInscription: false,
  payment: null,
  showError: false,
};

type UsePaymentApiType = {
  isInitializing: boolean;
  isConfirming: boolean;
  registered_cards: CardType[] | null;
  loadingCards: boolean;
  isRemovingInscription: boolean;
  payment: PaymentResponseType | null;
  showError: boolean;
  newInscription: () => Promise<AxiosResponse>;
  confInscription: (token: string) => Promise<AxiosResponse>;
  confirmWebpay: (
    request: ConfirmInscriptionRequestType
  ) => Promise<AxiosResponse>;
  setCards: () => Promise<AxiosResponse>;
  deleteCard: (id: string) => Promise<void>;
  OneClickPay: (
    id: string,
    request: AuthorizeTransactionType
  ) => Promise<AxiosResponse>;
  webPay: (request: WebpayPaymentRequestType) => Promise<AxiosResponse>;
  setPayment: (payment: PaymentResponseType) => void;
  closeError: () => void;
};

const usePaymentApi = (): UsePaymentApiType => {
  const [
    {
      loadingCards,
      isInitializing,
      isConfirming,
      registered_cards,
      isRemovingInscription,
      payment,
      showError,
    },
    dispatch,
  ] = useReducer(registerReducer, initialState);

  const setState = useCallback(
    (
      estado: string,
      payload: boolean | CardType[] | ErrorResponseType | PaymentResponseType
    ) => {
      dispatch({
        type: 'FIELD',
        fieldName: estado,
        payload: payload,
      });
    },
    []
  );

  const setPayment = useCallback(
    (paymt: PaymentResponseType) => {
      setState('payment', paymt);
    },
    [setState]
  );

  const newInscription = useCallback(async () => {
    setState('isInitializing', true);
    const res = await initInscription({
      returnUrl: inscriptionRedirectUri,
      redirect_uri: window.location.href,
    });
    setState('isInitializing', false);
    return res;
  }, [setState]);

  const setCards = useCallback(async () => {
    setState('loadingCards', true);
    const res = await getPaymentCards();
    if (res.status === 200) {
      setState('registered_cards', res.data);
    }
    setState('loadingCards', false);
    return res;
  }, [setState]);

  const confInscription = useCallback(
    async (token) => {
      setState('isConfirming', true);
      const res = await confirmInscription(token);
      switch (res.status) {
        case 200:
          setState('isConfirming', false);
          setCards();
          break;
        case 400:
          setState('showError', true);
          break;
      }

      return res;
    },
    [setState, setCards]
  );
  const deleteCard = useCallback(
    async (id) => {
      setState('isRemovingInscription', true);
      await removeInscription(id);
      setState('isRemovingInscription', false);
      setCards();
    },
    [setState, setCards]
  );

  const OneClickPay = useCallback(
    async (id: string, request: AuthorizeTransactionType) => {
      const res = await authorizeTransaction(id, request);
      if (res.status === 400) {
        const error = res.data as ErrorResponseType;
        toast.error(error.payload.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else if (res.status === 500) {
        toast.error('Ocurrió un error', {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      return res;
    },
    []
  );
  const webPay = useCallback(async (request) => {
    return await initWebpayTransaction(request);
  }, []);

  const confirmWebpay = useCallback(
    async (request: ConfirmInscriptionRequestType) => {
      const res = await confirmWebpayTransaction(request);
      if (res.status === 400) {
        const error = res.data as ErrorResponseType;
        toast.error(error.payload.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      return res;
    },
    []
  );

  const closeError = (): void => {
    setState('showError', false);
  };

  return {
    isInitializing,
    isConfirming,
    registered_cards,
    loadingCards,
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
  };
};

export { usePaymentApi };
