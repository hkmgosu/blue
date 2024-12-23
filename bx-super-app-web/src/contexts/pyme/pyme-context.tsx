import {
  FC,
  createContext,
  useMemo,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';

import { useAuth } from 'contexts/auth-context';
import type { PymeType } from 'types/auth';
import { updateUserDefaultPyme } from 'api/user';

type PymeContextType = {
  defaultPyme: PymeType | undefined;
  pymeList: PymeType[] | undefined;
  pymeListKeyedById: { [key: string]: PymeType };
  changeDefaultPyme: (pyme_id: string) => void;
};

const PymeContext = createContext({} as PymeContextType);

const PymeProvider: FC = (props) => {
  const { user } = useAuth();
  const [defaultPyme] = useState(() =>
    user?.pymes?.find((pyme) => pyme.id === user?.default_pyme)
  );
  const [pymeList, setPymeList] = useState(() => user?.pymes);

  const changeDefaultPyme = useCallback(async (pyme_id: string) => {
    try {
      const response = await updateUserDefaultPyme(pyme_id);
      if (response.is_success) {
        window.location.assign(window.location.href);
      }
    } catch (err) {}
  }, []);

  const pymeListKeyedById = useMemo(() => {
    if (pymeList?.length) {
      return pymeList.reduce(
        (acum, pyme) => ({
          ...acum,
          [pyme.id]: pyme,
        }),
        {} as { [key: string]: PymeType }
      );
    }

    return {};
  }, [pymeList]);

  useEffect(() => {
    if (user && user.pymes) {
      setPymeList(user.pymes);
    }
  }, [user]);

  const values = useMemo(
    () => ({ defaultPyme, pymeList, changeDefaultPyme, pymeListKeyedById }),
    [defaultPyme, pymeList, pymeListKeyedById, changeDefaultPyme]
  );

  return <PymeContext.Provider value={values} {...props} />;
};

const usePyme = (): PymeContextType => {
  const context = useContext(PymeContext);
  if (!context) {
    throw new Error('usePyme must be used within a PymeProvider');
  }
  return context;
};

export { PymeProvider, usePyme };
