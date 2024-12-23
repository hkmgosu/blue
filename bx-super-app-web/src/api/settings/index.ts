import { APIConstants } from 'config';
import { ErrorResponseType } from 'types/error-response';
import axiosInstance from 'utils/http-interceptor';

export type settingsType = {
  url: string;
  data_app_id: string;
  data_id: string;
  id: string;
};

export const getSettingsApi = async (): Promise<settingsType> => {
  const { data, status } = await axiosInstance.get<
    settingsType | ErrorResponseType
  >(`${APIConstants.identity}/settings/whatsapp-link`);

  if (status === 200) {
    return data as settingsType;
  }

  return Promise.reject(new Error((data as ErrorResponseType).payload?.error));
};
