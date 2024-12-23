import Axios, { AxiosError, AxiosRequestConfig } from 'axios';

import * as configApp from 'config';
import type { ErrorResponseType } from 'types/error-response';

declare module 'axios' {
  interface AxiosRequestConfig {
    handlerEnabled?: boolean;
    _retry?: boolean;
  }
}

const axiosInstance = Axios.create({
  baseURL: configApp.apiUrl,
  timeout: 15000,
});

axiosInstance.defaults.handlerEnabled = true;

axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
  config.headers['x-custom-lang'] = window.navigator.language.split('-')[0];
  config.headers['apikey'] = configApp.apiKey;

  if (config.handlerEnabled) {
    config.headers.Authorization = configApp.getAccessToken();
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ErrorResponseType>) => {
    const expectedError =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;
    if (!expectedError) {
      return Promise.reject(error);
    }

    const originalRequest = error.config;
    const refreshTokenUrl = `/${configApp.APIConstants.identity}/account/refresh-token`;
    const statusResponse = error?.response?.status;

    if (statusResponse === 401 && originalRequest.url === refreshTokenUrl) {
      configApp.cleanTokens();

      return Promise.resolve(error.response);
    }

    if (statusResponse === 401 && !originalRequest?._retry) {
      Object.assign(originalRequest, { _retry: true });
      const refreshToken = configApp.getRefreshToken();
      const response = await axiosInstance.post(
        refreshTokenUrl,
        { refresh_token: refreshToken },
        { handlerEnabled: false }
      );

      if (response?.status === 200) {
        const { access_token, refresh_token } = response.data;
        configApp.setAccessToken(access_token);
        configApp.setRefreshToken(refresh_token);
        axiosInstance.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${access_token}`;

        return axiosInstance(originalRequest);
      }
    }

    return Promise.resolve(error.response);
  }
);

export default axiosInstance;
