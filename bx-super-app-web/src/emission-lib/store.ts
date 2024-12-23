import { atom } from 'jotai';
import { focusAtom } from 'jotai/optics';
import { splitAtom } from 'jotai/utils';

import {
  EmissionStoreType,
  EmissionStateType,
  EmissionDtoType,
  EmissionSummaryDtoType,
  CreateEmissionStateType,
  PaymentStateType,
  CreateEmissionDtoType,
  ShippingStoreType,
  MassiveStoreType,
} from './types';

const emissionStore: EmissionStoreType = {
  billingType: 'BILL',
  discount: 0,
  emitter: {
    pyme_id: '',
    pyme_name: '',
    email: '',
    phone: '',
  },
  origin: {
    address: {
      city: '',
      commune: {
        base_name: '',
        base_post: '',
        code: '',
        location_code: '',
        name: '',
        zone: '',
      },
      complement: '',
      country: '',
      depto: '',
      geolocation: {
        latitude: -33.4334882,
        longitude: -70.797831917,
      },
      office: '',
      reference: '',
      region: {
        country: 0,
        name: '',
        region_iso_3166: '',
        region_number: '',
      },
      street: '',
      street_number: '',
    },
    agency_id: '',
    agency_name: '',
    isPickup: true,
  },
  promotion_code: '',
  promotion_id: '',
  refund: {
    address: {
      city: '',
      commune: {
        base_name: '',
        base_post: '',
        code: '',
        location_code: '',
        name: '',
        zone: '',
      },
      complement: '',
      country: '',
      depto: '',
      geolocation: {
        latitude: 0,
        longitude: 0,
      },
      office: '',
      reference: '',
      region: {
        country: 0,
        name: '',
        region_iso_3166: '',
        region_number: '',
      },
      street: '',
      street_number: '',
    },
    agency_id: '',
    agency_name: '',
    isPickup: false,
  },
  save_frequent_origin: false,
  shipping: [
    {
      destiny: {
        address: {
          city: '',
          commune: {
            base_name: '',
            base_post: '',
            code: '',
            location_code: '',
            name: '',
            zone: '',
          },
          complement: '',
          country: '',
          depto: '',
          geolocation: {
            latitude: 0,
            longitude: 0,
          },
          office: '',
          reference: '',
          region: {
            country: 0,
            name: '',
            region_iso_3166: '',
            region_number: '',
          },
          street: '',
          street_number: '',
        },
        agency_id: '',
        agency_name: '',
        isPickup: undefined,
      },
      frequent_alias_client: undefined,
      frequent_alias_package: undefined,
      package: [
        {
          content: '',
          dangerous_merchandise: false,
          package_sizes: {
            weight: 0,
            width: 0,
            height: 0,
            length: 0,
          },
          shipping_service: {
            codeDestination: null,
            codeOrigin: null,
            price: 0,
            service: 'STANDARD',
            sla: 0,
            weight: 0,
          },
          size: 'none',
          tax: 0,
          total_value: 0,
          warranty: false,
          warranty_bill_number: '',
          warranty_extended: 0,
          warranty_value: 0,
        },
      ],
      receiver: {
        name: '',
        lastName: '',
        email: '',
        phone: '',
        rut: '',
      },
      save_frequent_client: false,
      save_frequent_package: false,
      save_refund_address: false,
    },
  ],
  shipping_price: 0,
  tax: 0,
  terms_and_conditions_accepted: false,
  terms_and_conditions_accepted_date: undefined,
  total_price: 0,
  warranty: 0,
  withPromotion: false,
  emission_type: '',
};

export const storeAtom = atom<EmissionStoreType>(emissionStore);
storeAtom.debugLabel = 'storeAtom';

export const shippingsFocusAtom = focusAtom<
  EmissionStoreType,
  ShippingStoreType[]
>(storeAtom, (optic) => optic.prop('shipping'));
shippingsFocusAtom.debugLabel = 'shippingsFocusAtom';

export const shippingTotalAtom = atom((get) => {
  const shipping = get(shippingsFocusAtom);
  const price = shipping.reduce(
    (acc, curr) => acc + curr.package[0].shipping_service.price,
    0
  );
  const tax = shipping.reduce((acc, curr) => acc + curr.package[0].tax, 0);
  const warrantyValue = shipping.reduce(
    (acc, curr) => acc + curr.package[0].warranty_extended,
    0
  );
  return { price, tax, warrantyValue };
});
shippingTotalAtom.debugLabel = 'shippingTotalAtom';

export const shippingAtomsAtom = splitAtom(shippingsFocusAtom);
shippingAtomsAtom.debugLabel = 'shippingAtomsAtom';

export const shippingAtomsIdAtom = atom((get) => {
  return get(shippingAtomsAtom).map((ship) => ship.toString());
});
shippingAtomsIdAtom.debugLabel = 'shippingAtomsIdAtom';

export const emitterAtom = focusAtom(storeAtom, (optic) =>
  optic.prop('emitter')
);
emitterAtom.debugLabel = 'emitterAtom';

export const refundAtom = focusAtom(storeAtom, (optic) => optic.prop('refund'));
refundAtom.debugLabel = 'refundAtom';

export const originAtom = focusAtom(storeAtom, (optic) => optic.prop('origin'));
originAtom.debugLabel = 'originAtom';

const emissionState: EmissionStateType = {
  autoFilledFrequentOrigin: false,
  destinyView: 1,
  emissionId: '',
  emitterAddressIsCollapsed: true,
  emitterDataIsCollapsed: true,
  errorStep1: false,
  errorStep2: false,
  exitModalIsOpen: false,
  frequentClientsModal: false,
  measureWidth: 0,
  modalTermsIsOpen: false,
  multiSelectedTab: 1,
  nextModalOpen: false,
  openIsInvalid: false,
  paymentMethod: 'webpay',
  promotionalCodeIsFraction: false,
  promotionalCodeIsFree: false,
  receiverAddressIsCollapsed: true,
  serviceTypeIsCollapsed: true,
  shippingContentData: true,
  step: 1,
};

export const emissionStateAtom = atom<EmissionStateType>(emissionState);
emissionStateAtom.debugLabel = 'emissionStateAtom';

export const autoFilledFrequentOriginAtom = focusAtom(
  emissionStateAtom,
  (optic) => optic.prop('autoFilledFrequentOrigin')
);
autoFilledFrequentOriginAtom.debugLabel = 'autoFilledFrequentOriginAtom';

export const destinyViewAtom = focusAtom(emissionStateAtom, (optic) =>
  optic.prop('destinyView')
);
destinyViewAtom.debugLabel = 'destinyViewAtom';

export const emissionIdAtom = focusAtom(emissionStateAtom, (optic) =>
  optic.prop('emissionId')
);
emissionIdAtom.debugLabel = 'emissionIdAtom';

export const emissionTypeAtom = focusAtom(storeAtom, (optic) =>
  optic.prop('emission_type')
);
emissionTypeAtom.debugLabel = 'emissionTypeAtom';

export const emitterAddressIsCollapsedAtom = focusAtom(
  emissionStateAtom,
  (optic) => optic.prop('emitterAddressIsCollapsed')
);
emitterAddressIsCollapsedAtom.debugLabel = 'emitterAddressIsCollapsedAtom';

export const emitterDataIsCollapsedAtom = focusAtom(
  emissionStateAtom,
  (optic) => optic.prop('emitterDataIsCollapsed')
);
emitterDataIsCollapsedAtom.debugLabel = 'emitterDataIsCollapsedAtom';

export const errorStep1Atom = focusAtom(emissionStateAtom, (optic) =>
  optic.prop('errorStep1')
);
errorStep1Atom.debugLabel = 'errorStep1Atom';

export const errorStep2Atom = focusAtom(emissionStateAtom, (optic) =>
  optic.prop('errorStep2')
);
errorStep2Atom.debugLabel = 'errorStep2Atom';

export const exitModalIsOpenAtom = focusAtom(emissionStateAtom, (optic) =>
  optic.prop('exitModalIsOpen')
);
exitModalIsOpenAtom.debugLabel = 'exitModalIsOpenAtom';

export const frequentClientsModalAtom = focusAtom(emissionStateAtom, (optic) =>
  optic.prop('frequentClientsModal')
);
frequentClientsModalAtom.debugLabel = 'frequentClientsModalAtom';

export const measureWidthAtom = focusAtom(emissionStateAtom, (optic) =>
  optic.prop('measureWidth')
);
measureWidthAtom.debugLabel = 'measureWidthAtom';

export const modalTermsIsOpenAtom = focusAtom(emissionStateAtom, (optic) =>
  optic.prop('modalTermsIsOpen')
);
modalTermsIsOpenAtom.debugLabel = 'modalTermsIsOpenAtom';

export const multiSelectedTabAtom = focusAtom(emissionStateAtom, (optic) =>
  optic.prop('multiSelectedTab')
);
multiSelectedTabAtom.debugLabel = 'multiSelectedTabAtom';

export const nextModalOpenAtom = focusAtom(emissionStateAtom, (optic) =>
  optic.prop('nextModalOpen')
);
nextModalOpenAtom.debugLabel = 'nextModalOpenAtom';

export const openIsInvalidAtom = focusAtom(emissionStateAtom, (optic) =>
  optic.prop('openIsInvalid')
);
openIsInvalidAtom.debugLabel = 'openIsInvalidAtom';

export const paymentMethodAtom = focusAtom(emissionStateAtom, (optic) =>
  optic.prop('paymentMethod')
);
paymentMethodAtom.debugLabel = 'paymentMethodAtom';

export const promotionalCodeIsFractionAtom = focusAtom(
  emissionStateAtom,
  (optic) => optic.prop('promotionalCodeIsFraction')
);
promotionalCodeIsFractionAtom.debugLabel = 'promotionalCodeIsFractionAtom';

export const promotionalCodeResponseAtom = focusAtom(
  emissionStateAtom,
  (optic) => optic.prop('promotionalCodeResponse')
);
promotionalCodeResponseAtom.debugLabel = 'promotionalCodeResponseAtom';

export const promotionalCodeIsFreeAtom = focusAtom(emissionStateAtom, (optic) =>
  optic.prop('promotionalCodeIsFree')
);
promotionalCodeIsFreeAtom.debugLabel = 'promotionalCodeIsFreeAtom';

export const receiverAddressIsCollapsedAtom = focusAtom(
  emissionStateAtom,
  (optic) => optic.prop('receiverAddressIsCollapsed')
);
receiverAddressIsCollapsedAtom.debugLabel = 'receiverAddressIsCollapsedAtom';

export const serviceTypeIsCollapsedAtom = focusAtom(
  emissionStateAtom,
  (optic) => optic.prop('serviceTypeIsCollapsed')
);
serviceTypeIsCollapsedAtom.debugLabel = 'serviceTypeIsCollapsedAtom';

export const shippingContentDataIsCollapsedAtom = focusAtom(
  emissionStateAtom,
  (optic) => optic.prop('shippingContentData')
);
shippingContentDataIsCollapsedAtom.debugLabel =
  'shippingContentDataIsCollapsedAtom';

export const stepAtom = focusAtom(emissionStateAtom, (optic) =>
  optic.prop('step')
);
stepAtom.debugLabel = 'stepAtom';

const selectedShippingAtom = atom<string>('');
selectedShippingAtom.debugLabel = 'selectedShippingAtom';

export const selectedShippingIdAtom = atom<string, string>(
  (get) => get(shippingAtomsAtom)[0].toString(),
  (_get, set, update) => {
    set(selectedShippingAtom, update);
  }
);
selectedShippingIdAtom.debugLabel = 'selectedShippingIdAtom';

export const storeEmissionDtoAtom = atom<EmissionDtoType>((get) => {
  const storeEmission = get(storeAtom);
  return {
    billingType: storeEmission.billingType,
    emitter: storeEmission.emitter,
    shipping: storeEmission.shipping.map((ship) => {
      return {
        ...ship,
        package: ship.package.map((pack) => {
          return {
            ...pack,
            package_sizes: {
              ...pack.package_sizes,
              volumetricWeight:
                (pack.package_sizes.height *
                  pack.package_sizes.length *
                  pack.package_sizes.width) /
                4000,
            },
          };
        }),
        origin: storeEmission.origin,
        refund: storeEmission.refund,
        save_frequent_origin: storeEmission.save_frequent_origin,
      };
    }),
    shipping_price: storeEmission.shipping_price,
    tax: storeEmission.tax,
    total_price: storeEmission.total_price,
    warranty: storeEmission.warranty,
  };
});
storeEmissionDtoAtom.debugLabel = 'storeEmissionDtoAtom';

export const storeEmissionSummaryDtoAtom = atom<EmissionSummaryDtoType>(
  (get) => {
    const storeEmission = get(storeAtom);
    return {
      whoSend: {
        business_name: storeEmission.emitter.pyme_name,
        pickup: storeEmission.origin.agency_name,
      },
      destiny: storeEmission.shipping.map((ship) => {
        return {
          name: `${ship.receiver.name} ${ship.receiver.lastName}`,
          address: `${ship.destiny.address.street} ${ship.destiny.address.street_number}, ${ship.destiny.address.city}`,
          package: {
            size: ship.package[0].size,
            service: ship.package[0].shipping_service.service,
          },
          shipping_value: {
            value: ship.package[0].shipping_service.price,
            warrantyExtended: ship.package[0].warranty_extended,
            tax: ship.package[0].tax,
            total: ship.package[0].total_value,
          },
          shipping_service: {
            codeDestination: ship.package[0].shipping_service.codeDestination,
            codeOrigin: ship.package[0].shipping_service.codeOrigin,
            price: ship.package[0].shipping_service.price,
            service: ship.package[0].shipping_service.service,
            sla: ship.package[0].shipping_service.sla,
            tax: ship.package[0].tax,
            totalValue: ship.package[0].total_value,
            weight: ship.package[0].shipping_service.weight,
            warrantyExtended: ship.package[0].warranty_extended,
          },
        };
      }),
    };
  }
);
storeEmissionSummaryDtoAtom.debugLabel = 'storeEmissionSummaryDtoAtom';

const createEmissionState: CreateEmissionStateType = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  error: null,
};

export const createEmissionStateAtom =
  atom<CreateEmissionStateType>(createEmissionState);
createEmissionStateAtom.debugLabel = 'createEmissionStateAtom';

const paymentState: PaymentStateType = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  error: null,
};

export const paymentStateAtom = atom<PaymentStateType>(paymentState);
paymentStateAtom.debugLabel = 'paymentStateAtom';

export const createEmissionDtoAtom = atom<CreateEmissionDtoType>((get) => {
  const storeEmission = get(storeAtom);
  const promoIsFraction = get(promotionalCodeIsFractionAtom);
  const promoIsFree = get(promotionalCodeIsFreeAtom);
  const promotionDiscountDivided = promoIsFree
    ? 100
    : (promoIsFraction
        ? storeEmission.discount / 100
        : storeEmission.discount) /
      (promoIsFraction ? 1 : storeEmission.shipping.length);

  return {
    billingType: storeEmission.billingType,
    discount: storeEmission.discount,
    emitter: storeEmission.emitter,
    promotion_code: storeEmission.promotion_code,
    promotion_id: storeEmission.promotion_id,
    shipping: storeEmission.shipping.map((ship) => {
      return {
        ...ship,
        package: ship.package.map((shipPkg) => {
          const shipPkgExtendedWarranty = shipPkg.warranty_extended;
          const shipPkgShippingPrice = shipPkg.shipping_service.price;
          const _pricingDiscounted = promoIsFree
            ? 0
            : storeEmission.withPromotion
            ? promoIsFraction
              ? shipPkgShippingPrice -
                shipPkgShippingPrice * promotionDiscountDivided
              : shipPkgShippingPrice - promotionDiscountDivided
            : shipPkgShippingPrice;
          const _tax = (_pricingDiscounted + shipPkgExtendedWarranty) * 0.19;
          const totalValue =
            _pricingDiscounted + shipPkgExtendedWarranty + _tax;
          return {
            ...shipPkg,
            promotion_id: storeEmission.promotion_id,
            tax: _tax,
            total_value: totalValue,
          };
        }),
        origin: storeEmission.origin,
        refund: storeEmission.refund,
        save_frequent_origin: storeEmission.save_frequent_origin,
      };
    }),
    shipping_price: storeEmission.shipping_price,
    tax: storeEmission.tax,
    terms_and_conditions_accepted: storeEmission.terms_and_conditions_accepted,
    terms_and_conditions_accepted_date:
      storeEmission.terms_and_conditions_accepted_date,
    total_price: storeEmission.total_price,
    warranty: storeEmission.warranty,
    withPromotion: storeEmission.withPromotion,
    emission_type: storeEmission.emission_type,
  };
});
createEmissionDtoAtom.debugLabel = 'createEmissionDtoAtom';

/**
 * @todo limpiar propiedades no utilizadas en el nuevo envío masivo
 */
const massiveStore = {
  inputFile: null,
  inProgress: false,
  progress: 0,
  packageDangerousAtom: false,
  isLoading: false,
  isSuccess: false,
  error: null,
  table: null,
  /**
   * @todo redefinir tipo
   */
  shippingList: null,
  /**
   * @todo limpiar
   */
  processDetail: {
    process: 0,
    error: 0,
  },
};

export const massiveStoreAtom = atom<MassiveStoreType>(massiveStore);

export const repayEmissionAtom = atom<EmissionStoreType | null>(null);

export const emissionMultiIsValidAtom = atom(false);
