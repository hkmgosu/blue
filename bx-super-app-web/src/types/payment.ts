export type OriginCode = 'EMISSION' | 'MULTIPLE' | 'MASSIVE';

export enum PaymentMethod {
  ALL = '*',
  WEBPAY = 'WEBPAY',
  ONECLICK = 'ONECLICK',
  RECEIVER = 'RECEIVER',
  FREE = 'FREE',
  BANCOESTADO = 'BANCOESTADO',
}

export enum PaymentStatus {
  INITIALIZED = 'INITIALIZED',
  ABORTED = 'ABORTED',
  REFUNDED = 'REFUNDED',
  TOPAY = 'TOPAY',
  PAID = 'PAID',
}

export type CardType = {
  id: string;
  cardType: string;
  cardNumber: string;
};
export type PaymentStateType = {
  registered_cards: CardType[] | null;
  loadingCards: boolean;
  isInitializing: boolean;
  isConfirming: boolean;
  isRemovingInscription: boolean;
  payment: PaymentResponseType | null;
  showError: boolean;
};
export type ReceiverPaymentRequestType = {
  pymeId: string;
  paymentId: string;
  originCode: OriginCode;
  amount: number;
  promotionalCode: string;
};
export type WebpayPaymentRequestType = {
  pymeId: string;
  paymentId: string;
  originCode: OriginCode;
  amount: number;
  returnUrl: string;
  promotionalCode: string;
};

export interface GenericPaymentRequestType {
  pymeId: string;
  paymentId: string;
  originCode: OriginCode;
  returnUrl: string;
}

export type InitInscriptionRequestType = {
  returnUrl: string;
  redirect_uri: string;
};
export type ConfirmInscriptionRequestType = {
  token: string;
};

export type AuthorizeTransactionType = {
  amount: number;
  installmentsNumber: number;
  paymentId: string;
  originCode: OriginCode;
  pymeId: string;
  promotionalCode?: string;
};

export type InitInscriptionResponseType = {
  username: string;
  email: string;
  response_url: string;
};
export type ConfirmInscriptionResponseType = {
  id: string;
  cardType: string;
  cardNumber: string;
};

export type CommitTransactionResponseType = {
  vci: string;
  amount: number;
  status: string;
  buy_order: string;
  session_id: string;
  card_detail: {
    card_number: number;
  };
  accounting_date: string;
  transaction_date: string;
  authorization_code: string;
  payment_type_code: string;
  response_code: number;
  installments_number: number;
};

export type PaymentResponseType = {
  userId: string;
  transactionId: string;
  originService: OriginCode;
  promotionalCode: string;
  amount: number;
  paymentMethod: PaymentMethod;
  status: PaymentStatus;
  cardNumber: string;
  installmentsNumber: number;
  cardType?: string;
  createdAt?: string;
  updatedAt?: string;
  meta: any;
};
