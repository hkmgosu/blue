export type SlaType = number;
export type ServicesType = '24 hrs' | '48 hrs' | '72 hrs' | string;
export type ServicePriceType = 'STANDARD' | 'NEXT DAY';

export type PricingDtoType = {
  codeOrigin: string | null;
  codeDestination: string | null;
  broad: number;
  high: number;
  length: number;
  weight: number;
};

export type PricingResponseType = {
  codeOrigin: string;
  codeDestination: string;
  price: number;
  weight: number;
  service: ServicePriceType;
  sla: SlaType;
};

export type PricingReturnType = [PricingResponseType, PricingResponseType];

export type PricingHookDtoType = {
  isPickup: boolean | undefined;
  codeOrigin: string;
  codePickup: string;
  extendedWarrantyValue: number;
  googleBasepost: string;
  broad: number;
  high: number;
  length: number;
  weight: number;
};

export type UseReturnType = {
  warrantyValue: number;
  tax: number;
  totalValue: number;
  codeOrigin: string | null;
  codeDestination: string | null;
  price: number;
  weight: number;
  service: ServicePriceType;
  sla: SlaType;
};

export type UseGetPricingReturnType = {
  isLoading: boolean;
  isError: boolean;
  error: string | null;
  price: UseReturnType[];
  withRequest: boolean;
};

export type PricingQuoteHookDtoType = {
  codeOrigin: string;
  codeDestination: string;
  broad: number;
  high: number;
  length: number;
  weight: number;
};

export type UseReturnQuoteType = {
  tax: number;
  totalValue: number;
  codeOrigin: string | null;
  codeDestination: string | null;
  price: number;
  weight: number;
  service: ServicePriceType;
  sla: SlaType;
};

export type UseGetPricingQuoteReturnType = {
  isLoading: boolean;
  isError: boolean;
  error: string | null;
  price: UseReturnQuoteType[];
  withRequest: boolean;
};
