import { createContext, ReactNode, useEffect } from 'react';

import { cleanLocationsStorage } from 'config';
import { useGetFrequentOriginByPymeId } from 'hooks/frequent-origin/use-get-frequent-origin-by-pyme-id';
import WideLoader from 'components/utils/wide-loader';
import { queryClient } from '../query-client';
import type { UserType } from 'types/auth';

const FrequentOriginContext = createContext(null);

type Props = {
  children: ReactNode;
};

function FrequentOriginProvider({ children }: Props): JSX.Element {
  const { isLoading, isSuccess } = useGetFrequentOriginByPymeId(
    queryClient.getQueryData<UserType>('user')?.default_pyme || ''
  );

  useEffect(() => {
    cleanLocationsStorage();
  }, []);

  if (!isLoading && isSuccess) {
    return (
      <FrequentOriginContext.Provider value={null}>
        {children}
      </FrequentOriginContext.Provider>
    );
  }
  return <WideLoader />;
}

export default FrequentOriginProvider;
