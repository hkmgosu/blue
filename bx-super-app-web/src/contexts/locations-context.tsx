import { createContext, ReactNode } from 'react';

import { useRegionsCache } from 'hooks/locations-cache/use-regions-cache';
import { useComunesCache } from 'hooks/locations-cache/use-communes-cache';
import WideLoader from 'components/utils/wide-loader';
import { usePopup } from 'hooks/popup/use-popup';

const LocationContext = createContext(null);

type Props = {
  children: ReactNode;
};

function LocationProvider({ children }: Props): JSX.Element {
  useRegionsCache();
  useComunesCache();
  const { isLoading: popupIsLoading, isSuccess: popupIsSuccess } = usePopup();

  if (!popupIsLoading && popupIsSuccess) {
    return (
      <LocationContext.Provider value={null}>
        {children}
      </LocationContext.Provider>
    );
  }
  return <WideLoader />;
}

export default LocationProvider;
