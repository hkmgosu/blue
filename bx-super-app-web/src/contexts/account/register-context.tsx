import {
  createContext,
  FC,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import { registerAPI, registerType } from 'api/register';

export type DispatchType = {
  register: (request: registerType) => Promise<void>;
  showRegisterEmailError: (status: boolean) => void;
};

type StateType = {
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
  showErrorMailMessage: boolean;
};

const RegisterContextState = createContext({} as StateType);
const RegisterContextDispatch = createContext({} as DispatchType);

const RegisterProvider: FC = (props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [showErrorMailMessage, setShowErrorMailMessage] =
    useState<boolean>(false);

  const showRegisterEmailError = useCallback((status: boolean) => {
    setShowErrorMailMessage(status);
  }, []);

  const register = useCallback(
    async (request: registerType) => {
      try {
        setIsLoading(true);
        const res = await registerAPI(request);

        switch (res.status) {
          case 200:
          case 201:
            setIsSuccess(true);
            break;
          default:
            setError(res.data.payload?.message);
            showRegisterEmailError(true);
            break;
        }
      } catch (e) {
        setError('Error desconocido');
      }
    },
    [setIsLoading, setError, showRegisterEmailError]
  );

  const states = useMemo(
    () => ({ isLoading, error, isSuccess, showErrorMailMessage }),
    [isLoading, error, isSuccess, showErrorMailMessage]
  );

  const values = useMemo(
    () => ({ register, showRegisterEmailError }),
    [register, showRegisterEmailError]
  );

  return (
    <RegisterContextState.Provider value={states}>
      <RegisterContextDispatch.Provider value={values} {...props} />
    </RegisterContextState.Provider>
  );
};

const useRegisterState = (): StateType => {
  const context = useContext(RegisterContextState);
  if (!context) {
    throw new Error('useRegisterState must be user within a RegisterProvider');
  }
  return context;
};

const useRegisterDispatch = (): DispatchType => {
  const context = useContext(RegisterContextDispatch);
  if (!context) {
    throw new Error(
      'useRegisterDispatch must be used within a RegisterProvider'
    );
  }
  return context;
};

export { RegisterProvider, useRegisterState, useRegisterDispatch };
