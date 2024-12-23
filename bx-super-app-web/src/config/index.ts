export const environment = process.env.REACT_APP_ENV;

export const ACCESS_TOKEN_KEY = '__access-token__';
export const REFRESH_TOKEN_KEY = '__refresh-token__';

export const KEY_REGIONS = 'locations-regions';
export const KEY_COMMUNES = 'locations-communes';
export const KEY_AGENCIES = 'locations-agencies';
export const compensationsUrl = process.env.REACT_APP_COMPENSATIONS_URL || '';
export const priceQuoteUrl = process.env.REACT_APP_PRICE_QUOTE_URL || '';
export const salesforceTrackUrl = process.env.REACT_APP_SALESFORCE || '';
export const ticketeraTrackUrl = process.env.REACT_APP_TICKETERA || '';
export const problemSolutionUrl = process.env.REACT_APP_PROBLEM_SOLUTION || '';

export const apiUrl = process.env.REACT_APP_API_URL;
export const apiKey = process.env.REACT_APP_API_KEY;
export const bucketS3 = process.env.REACT_APP_BUCKET_S3;
export const keycloakUrl = process.env.REACT_APP_KEYCLOAK_URL;
export const keycloakAuthUrl = process.env.REACT_APP_KEYCLOAK_AUTH_URL;
export const keycloakClient = process.env.REACT_APP_KEYCLOAK_CLIENT || '';
export const keycloakClientSecret =
  process.env.REACT_APP_KEYCLOAK_CLIENT_SECRET || '';
export const redirectUri = process.env.REACT_APP_REDIRECT_URI || '';

export const inscriptionRedirectUri =
  redirectUri?.concat('/confirm-new-payment') || '';

export const webpayReturnUri = redirectUri?.concat('/payment-order') || '';

export const paymentGenericReturnUri =
  redirectUri?.concat('/payment-order') || '';

export const APIConstants = {
  identity: 'api/pyme2c/backend/v1',
  payments: 'api/cross/payments/v1',
  paymentsV2: 'api/cross/payments/v2',
  locations: 'api/cross/locations/v1',
  locationsV2: 'api/cross/locations/v2',
  appraisals: 'api/pyme2c/cotizaciones/v1',
  emissions: 'api/pyme2c/emissions/v1',
  massive_emissions: 'api/pyme2c/massive-emissions/v1',
  pricing: 'api/pyme2c/tarifario/v1',
  elabel: 'api/pyme2c/emissions/v1/elabel/validate?code=',
};

export const cleanTokens = (): void => {
  window.localStorage.removeItem(ACCESS_TOKEN_KEY);
  window.localStorage.removeItem(REFRESH_TOKEN_KEY);
};

export function cleanLocationsStorage(): void {
  window.localStorage.removeItem(KEY_REGIONS);
  window.localStorage.removeItem(KEY_COMMUNES);
  window.localStorage.removeItem(KEY_AGENCIES);
}

export const cleanTokensFormShipping = (): void => {
  window.localStorage.removeItem('phone-emitter-form');
  window.localStorage.removeItem('email-emitter-form');
  window.localStorage.removeItem('address-emitter-form');
  window.localStorage.removeItem('depto-emitter-form');
  window.localStorage.removeItem('office-emitter-form');
  window.localStorage.removeItem('name-destiny-form');
  window.localStorage.removeItem('lastname-destiny-form');
  window.localStorage.removeItem('rut-destiny-form');
  window.localStorage.removeItem('phone-destiny-form');
  window.localStorage.removeItem('email-destiny-form');
  window.localStorage.removeItem('dangerous-destiny-form');
  window.localStorage.removeItem('content-package');
  window.localStorage.removeItem('warranty-value-package');
  window.localStorage.removeItem('warranty-destiny-form');
  window.localStorage.removeItem('bill-number-destiny-form');
  window.localStorage.removeItem('package-destiny-form');
  window.localStorage.removeItem('length-destiny-form');
  window.localStorage.removeItem('width-destiny-form');
  window.localStorage.removeItem('height-destiny-form');
  window.localStorage.removeItem('weight-destiny-form');
  window.localStorage.removeItem('shippingState');
  window.localStorage.removeItem('address-emitter-google-response-form');
  window.localStorage.removeItem('region-emitter-location-response-form');
  window.localStorage.removeItem('commune-emitter-location-response-form');
};

export const setAccessToken = (access_token: string): void =>
  window.localStorage.setItem(ACCESS_TOKEN_KEY, access_token);

export const setRefreshToken = (refresh_token: string): void =>
  window.localStorage.setItem(REFRESH_TOKEN_KEY, refresh_token);

export const getAccessToken = (): string => {
  const accessToken = window.localStorage.getItem(ACCESS_TOKEN_KEY);

  return accessToken ? `Bearer ${accessToken}` : '';
};

export const getRefreshToken = (): string => {
  const refreshToken = window.localStorage.getItem(REFRESH_TOKEN_KEY);

  return refreshToken || '';
};

export const shippingPathId = {
  origin: 'origen',
  destination: 'destinos',
  unitaryDestination: 'destino',
  shipment: 'envio',
  package: 'paquete',
  summary: 'resumen',
  checkout: 'pago',
  success: 'exito',
  paymentError: 'error-pago',
};

export const shippingPaths = {
  massive: {
    // para que react-router infiera las props
    default: '/envio-masivo/:view?' as '/envio-masivo/:view',
    stepOrder: [
      shippingPathId.origin,
      shippingPathId.destination,
      shippingPathId.destination,
      shippingPathId.checkout,
    ],
  },
  unitary: {
    default: '/envio-unitario/:view?' as '/envio-unitario/:view',
    stepOrder: [
      shippingPathId.origin,
      shippingPathId.unitaryDestination,
      shippingPathId.package,
      shippingPathId.checkout,
    ],
  },
  multi: {
    default: '/multi-envio/:view?' as '/multi-envio/:view',
    stepOrder: [
      shippingPathId.origin,
      shippingPathId.shipment,
      shippingPathId.checkout,
    ],
  },
};

export type TShippingPaths = keyof typeof shippingPaths;

export const getShippingStep = (
  type: keyof typeof shippingPaths,
  view: string | undefined
): number => (view ? shippingPaths[type].stepOrder.indexOf(view) + 1 : 0);

export const getShippingPath = (
  type: keyof typeof shippingPaths,
  step: number
): string => {
  const steps = shippingPaths[type].stepOrder as string[];
  return steps.at(step - 1) || (steps.at(0) as string);
};
