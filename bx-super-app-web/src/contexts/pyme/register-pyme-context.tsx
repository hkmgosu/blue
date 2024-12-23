import { createContext, FC, useCallback, useContext, useMemo } from 'react';

import { ACCESS_TOKEN_KEY } from 'config';
import { usePymeRegisterApi } from 'hooks/pyme/use-pyme-register-api';
import { pymeRegisterApi } from 'api/pyme-register';
import type { PymeRegisterRequestType } from 'types/pyme';

type ContextStateType = {
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
};

type ContextDispatchType = {
  pymeRegister: (request: PymeRegisterRequestType) => Promise<void>;
};

const PymeRegisterStateContext = createContext({} as ContextStateType);
const PymeRegisterDispatchContext = createContext({} as ContextDispatchType);

const PymeRegisterProvider: FC = (props) => {
  const { isLoading, error, isSuccess, setLoading, setSuccess, setError } =
    usePymeRegisterApi();

  const pymeRegister = useCallback(
    async (request: PymeRegisterRequestType): Promise<void> => {
      try {
        setLoading(true);
        const res = await pymeRegisterApi(request);
        if (res.is_success) {
          window.localStorage.setItem(ACCESS_TOKEN_KEY, 'not found');
          window.location.replace('/dashboard');
          setSuccess();
          setLoading(false);
        } else {
          setError(res.payload.message);
          setLoading(false);
        }
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    },
    [setError, setLoading, setSuccess]
  );

  const values = useMemo(() => ({ pymeRegister }), [pymeRegister]);

  return (
    <PymeRegisterStateContext.Provider value={{ isLoading, error, isSuccess }}>
      <PymeRegisterDispatchContext.Provider value={values} {...props} />
    </PymeRegisterStateContext.Provider>
  );
};

const usePymeRegisterState = (): ContextStateType => {
  const context = useContext(PymeRegisterStateContext);
  if (!context) {
    throw new Error(
      'usePymeRegisterState must be user within a PymeRegisterProvider'
    );
  }
  return context;
};

const usePymeRegisterDispatch = (): ContextDispatchType => {
  const context = useContext(PymeRegisterDispatchContext);
  if (!context) {
    throw new Error(
      'usePymeRegisterDispatch must be user within a PymeRegisterProvider'
    );
  }
  return context;
};

export { PymeRegisterProvider, usePymeRegisterState, usePymeRegisterDispatch };
