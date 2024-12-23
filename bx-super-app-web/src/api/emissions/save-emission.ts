import { APIConstants } from 'config';
import axiosInstance from 'utils/http-interceptor';
import type { ShippingHashDtoType } from 'types/shipping';
import { hashObject } from 'utils/sign-hash';
import { CreateEmissionDtoType } from 'emission-lib/types';

export const saveEmission = (
  emissionData: CreateEmissionDtoType
): Promise<any> => {
  // format prices before send emission
  const formattedData = { ...emissionData };
  formattedData.shipping.forEach((shipping: any) => {
    // math round on packgage values
    shipping.package.forEach((pack: any) => {
      pack.tax = Math.round(pack.tax);
      pack.total_value = Math.round(pack.total_value);
      pack.warranty_extended = Math.round(pack.warranty_extended);
    });
  });
  formattedData.tax = Math.round(formattedData.tax);
  formattedData.total_price = Math.round(formattedData.total_price);
  formattedData.warranty = Math.round(formattedData.warranty);

  let strEmission: string = '';
  Object.keys(formattedData).forEach((key, i) => {
    if (key === 'shipping') {
      strEmission += '+shipping:';
      strEmission += JSON.stringify(
        formattedData[key].map((x: any) => {
          return {
            origin: x.origin,
            destiny: x.destiny,
            package: x.package,
          };
        })
      );
    } else {
      strEmission += `${i === 0 ? '' : '+'}${key}:${JSON.stringify(
        formattedData[key as ShippingHashDtoType]
      )}`;
    }
  });
  return axiosInstance.post(`/${APIConstants.emissions}/emissions`, {
    s_: hashObject(strEmission),
    ...formattedData,
  });
};
