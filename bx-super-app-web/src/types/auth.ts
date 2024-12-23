import { PymeBankInformation } from './pyme';

export type CollaboratorType = {
  id: string;
  createdTimestamp: number;
  username: string;
  enabled: boolean;
  totp: boolean;
  emailVerified: string;
  firstName: string;
  lastName: string;
  email: string;
  disableableCredentialTypes: [];
  requiredActions: [];
  federatedIdentities: [];
  notBefore: number;
  is_admin: boolean;
  profile_pic?: string;
  phone?: string;
  access: {
    impersonate: boolean;
    manage: boolean;
    manageGroupMembership: boolean;
    mapRoles: boolean;
    view: boolean;
  };
};

export type PymeType = {
  id: string;
  social_reason: string;
  created: Date;
  rut: string;
  email: string;
  collaborators?: Array<CollaboratorType>;
  billing_information: BillingInfoType;
  has_billing_information: boolean;
  is_natural_person?: boolean;
  bank_account_information?: PymeBankInformation;
};

export type BillingInfoType = {
  rut: string;
  commune: {
    code: string;
    name: string;
    region: string;
    base_post: string;
    location_code: string;
  };
  address: string;
  address_number: string;
  department: string;
  address_office: string;
  postal_code: string;
  city_name: string;
  region: {
    name: string;
    region_number: string;
    region_iso_3166: string;
    country: number;
  };
  phone: string;
  email: string;
  current_account: string;
};

export type InvitationType = {
  invitationType: 'COLLABORATOR' | 'ADMIN';
  _id: string;
  pyme_id: string;
  pyme_name: string;
  email: string;
  status: 'PENDING' | 'REJECTED' | 'ACCEPTED';
};

export type UserType = {
  sub: string;
  email_verified: boolean;
  roles: Array<string>;
  name: string;
  preferred_username: string;
  given_name: string;
  family_name: string;
  email: string;
  default_pyme: string;
  pymes: Array<PymeType>;
  profile_pic?: string;
  phone?: string;
  first_login: boolean;
  invitations: InvitationType[];
  first_steps: boolean;
};

export type LoginResponseOk = {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  token_type: string;
  id_token: string;
  session_state: string;
  scope: string;
};

export type LoginResponseNok = {
  disabled: boolean;
  lastFailure: number;
  lastIPFailure: string;
  numFailures: number;
};

export type LoginResponseReject = {
  statusCode: number;
  timestamp: string;
  path: string;
  payload: {
    statusCode: number;
    message: string;
    error: string;
  };
};

export type LoginResponseNotConfirmed = {
  statusCode: number;
  timestamp: string;
  path: string;
  payload: {
    statusCode: number;
    message: string;
    error: string;
  };
};

export type SocialLoginResponseDataType = {
  access_token: string;
  id_token: string;
  expires_in: number;
  refresh_token: string;
};

export type RefreshTokenResponse = LoginResponseOk & {
  'not-before-policy': number;
};

export type UnionLoginResponse =
  | LoginResponseOk
  | LoginResponseNok
  | LoginResponseReject
  | LoginResponseNotConfirmed
  | undefined;

export type LoginResponse = {
  type: 'success' | 'invalid' | 'incorrect' | 'unknown' | 'notConfirmed';
  data: UnionLoginResponse;
};

export type LoginRequest = {
  username: string;
  password: string;
};

export type StateType = {
  user: UserType;
  login: (form: any) => Promise<void>;
  logout: () => void;
};

export type DispatchType = {
  login: () => Promise<void>;
  logout: () => Promise<void>;
  revalidateToken: () => Promise<void>;
};

export type UserDefaultPymeUpdateResponse = {
  is_success: boolean;
};
