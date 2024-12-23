export type NewBusinessRegisterType = {
  social_reason: string;
  user_id: string;
  rut?: string;
  shipping_average_weight?: string;
  shipping_type?: ShippingPackageContentType;
  collaborator_quantity?: ColaboratorQuantityType;
  shipping_quantity?: ShippingQuantityType;
  other_type?: string;
};

export type ShippingPackageContentType =
  | 'INVALID'
  | 'TECHNOLOGY'
  | 'HOME'
  | 'CLOTHES'
  | 'BEAUTY'
  | 'OFFICE'
  | 'TOYS'
  | 'FOOD'
  | 'DOCUMENTS'
  | 'OTHER';

export type ShippingQuantityType =
  | 'INVALID'
  | 'BEGINNER'
  | '10_TO_49'
  | '50_TO_100'
  | '101_TO_300'
  | '301_TO_500'
  | '501_TO_1000'
  | '1001_TO_5000'
  | 'MORE_5000';

export type ColaboratorQuantityType =
  | 'INVALID'
  | '0_TO_10'
  | '11_TO_50'
  | '51_TO_400'
  | '401_TO_1000'
  | 'MORE_1000';
