import type { UseReturnQuoteType } from 'types/pricing';
import type { ShippingCommuneType, ShippingRegionType } from 'types/shipping';

export type PriceQuoteRegionType = ShippingRegionType;

export type PriceQuoteCommuneType = ShippingCommuneType;

export type PriceQuoteSizeType = 'XS' | 'S' | 'M' | 'L' | 'none';

export type PriceQuoteLenghtType = number;

export type PriceQuoteWidthType = number;

export type PriceQuoteHeightType = number;

export type PriceQuoteWeightType = number;

export type PriceQuoteShippingBxServiceType = 'STANDARD' | 'NEXT DAY' | null;

export type PriceQuotePricingType = {
  tax: number;
  totalValue: number;
  codeOrigin: string | null;
  codeDestination: string | null;
  price: number;
  weight: number;
  service: PriceQuoteShippingBxServiceType;
  sla: number;
}[];

export type PriceQuoteSummaryType = {
  businessName: string;
  originCommune: string;
  destinyCommune: string;
  price: UseReturnQuoteType | undefined;
  size: PriceQuoteSizeType;
  sizes: {
    width: number;
    length: number;
    height: number;
    weight: number;
  };
  originCommuneData: PriceQuoteCommuneType;
  originRegionData: PriceQuoteRegionType;
  destinyCommuneData: PriceQuoteCommuneType;
  destinyRegionData: PriceQuoteRegionType;
  bxShippingService: PriceQuoteShippingBxServiceType;
};
