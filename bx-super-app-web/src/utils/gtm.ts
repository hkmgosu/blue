import TagManager from 'react-gtm-module';

const gtmId = process.env.REACT_APP_GTM_ID ? process.env.REACT_APP_GTM_ID : '';

declare global {
  interface Window {
    dataLayer: object[];
  }
}

const pushToDataLayer = (obj: object): void => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(obj);
};

const tagManagerArgs = {
  gtmId,
};

const init = (): void => {
  TagManager.initialize(tagManagerArgs);
};

const sendEvent = (dataLayer: object): void => {
  pushToDataLayer(dataLayer);
};

const sendEventPageView = (url: string): void => {
  const dataArs = {
    gtmId,
    events: {
      event: 'pageView',
      page: url,
    },
  };
  TagManager.initialize(dataArs);
};

export { init, sendEvent, sendEventPageView };
