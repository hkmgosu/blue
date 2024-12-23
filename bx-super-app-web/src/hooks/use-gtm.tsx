import { useEffect } from 'react';

import * as gtm from 'utils/gtm';

export const useGTM = (): void => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      gtm.init();
    }
  }, []);
};
