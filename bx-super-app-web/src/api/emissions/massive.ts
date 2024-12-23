import { nanoid } from 'nanoid';

import { APIConstants } from 'config';
import axiosInstance from 'utils/http-interceptor';
import type { MassiveEmissionsResponse } from 'types/massive-emission';
import type {
  MassiveResponseErrorUpload,
  MassiveResponseSuccess,
  MassiveField,
  MassiveMetaData,
} from 'types/massive-table';
import type {
  ServiceType,
  ShippingServicesResponseType,
} from 'types/appraisal';
import type { ShippingEmitterType } from 'types/shipping';
import type { ErrorResponseType } from 'types/error-response';

type FormType = {
  emitter: ShippingEmitterType;
  origin: string;
  file: File;
};

/**
 *
 * @todo Eliminar dependencias de tipo, dada la nueva gestión de respuestas
 * @todo Eliminar el envío de Atom todas las dependencias de este estado.
 */
// type MassiveResponseType = {
//   shipping: Array<NewShippingListAtomType>;
//   rowsCannotRead: number;
//   resume: { process: number; error: number };
// };

export async function SendMassiveFileAndOrigin(
  data: FormType
): Promise<MassiveResponseSuccess> {
  const formData = new FormData();
  formData.append('emitter', JSON.stringify(data.emitter));
  formData.append('origin', data.origin);
  formData.append('file', data.file);

  const { data: response, status } = await axiosInstance.post<
    MassiveResponseSuccess | MassiveResponseErrorUpload
  >(`${APIConstants.massive_emissions}/massive-emissions/load`, formData);

  if (![200, 201].includes(status)) {
    return Promise.reject(
      'error' in response ? new Error(`${response.error}`) : new Error()
    );
  }

  return response as MassiveResponseSuccess;
}

export const getEmissionInProcess =
  async (): Promise<MassiveEmissionsResponse> => {
    const { data } = await axiosInstance.get<MassiveEmissionsResponse>(
      `/${APIConstants.massive_emissions}/massive-emissions/process`
    );

    return {
      emitter: data.emitter || {},
      origin: data.origin || {},
      errors: (data.errors || []).map((err: any) => ({
        ...err,
        id: nanoid(),
      })),
      success: (data.success || []).map((succ: any) => ({
        ...succ,
        id: nanoid(),
      })),
    };
  };

export const getServices = async (): Promise<ServiceType[]> => {
  const { data, status } = await axiosInstance.get<
    ShippingServicesResponseType | ErrorResponseType
  >(`/${APIConstants.appraisals}/bx-shipping-service`);

  if (status === 200) {
    return (data as ShippingServicesResponseType).services;
  }

  return Promise.reject(new Error((data as ErrorResponseType)?.payload.error));
};

export async function sendValidateTable(
  massivedata: Omit<MassiveField, 'metadata'>[],
  origin: string
): Promise<MassiveResponseSuccess> {
  const { data: response, status } = await axiosInstance.post<
    MassiveMetaData | MassiveResponseErrorUpload
  >(
    `${APIConstants.massive_emissions}/massive-emissions/validate`,
    `massivedata=${JSON.stringify(massivedata)}&origin="${origin}"`
  );
  if (![200, 201].includes(status)) {
    return Promise.reject(
      'error' in response ? new Error(`${response.error}`) : new Error()
    );
  }

  return response as MassiveResponseSuccess;
}

export async function sendConfirmTable(
  massivedata: Omit<MassiveField, 'metadata'>[],
  origin: string
): Promise<MassiveMetaData[]> {
  const { data: response, status } = await axiosInstance.post<
    MassiveMetaData | MassiveResponseErrorUpload
  >(
    `${APIConstants.massive_emissions}/massive-emissions/confirm`,
    `massivedata=${JSON.stringify(massivedata)}&origin="${origin}"`
  );
  if (![200, 201].includes(status)) {
    return Promise.reject(
      'error' in response ? new Error(`${response.error}`) : new Error()
    );
  }

  return response as MassiveMetaData[];
}
