import { PymeType } from './auth';

export type PymeRegisterRequestType = {
  social_reason: string;
  user_id: string;
  email?: string;
  rut?: string;
  is_natural_person?: boolean;
};

export type PymeUpdateRequestType = {
  social_reason: string;
  email?: string;
  rut?: string;
  is_natural_person?: boolean;
};
export type PymeUpdateResponeType = {
  is_success: boolean;
  data: PymeType;
};
export type PymeRegisterResponseType = {
  statusCode?: number;
  timestamp?: string;
  path?: string;
  payload?: any;
  is_success: boolean;
  error?: string;
  message?: string;
  pyme?: any;
  rut?: boolean;
};

export type JoinToPymeRequestType = {
  social_reason: string;
  user_id: string;
};

export type JoinToPymeResponseType = {
  statusCode?: number;
  timestamp?: string;
  path?: string;
  payload?: any;
  is_success: boolean;
  error?: string;
  message?: string;
  pyme?: any;
};

export type PymeBankInformation = {
  client_name: string;
  last_name: string;
  rut: string;
  bank: string;
  account_type: string;
  account_number: string;
};

export type PymeBankInformationResponse = {
  isSuccess: boolean;
};
