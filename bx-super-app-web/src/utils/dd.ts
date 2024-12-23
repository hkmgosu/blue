import { datadogRum } from '@datadog/browser-rum';

export function ddInit(): void {
  datadogRum.init({
    applicationId: process.env.REACT_APP_DD_APPLICATION_ID || '',
    clientToken: process.env.REACT_APP_DD_CLIENT_TOKEN || '',
    site: 'datadoghq.com',
    service: process.env.REACT_APP_DD_SERVICE_NAME || '',
    env: process.env.REACT_APP_ENV,
    sampleRate: 100,
    premiumSampleRate: 0,
    trackInteractions: true,
  });
}

export function ddSetUser(user: {
  id: string;
  name: string;
  email: string;
}): void {
  datadogRum.setUser(user);
}
