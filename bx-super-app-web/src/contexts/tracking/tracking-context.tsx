import {
  createContext,
  FC,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { toast, ToastContainer } from 'react-toastify';

import { getOrderService } from 'api/tracking';
import type { OsType } from 'types/tracking';

type ContextStateType = {
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
  urlOs: string | null;
  os: OsType | null;
};

type ContextDispatchType = {
  getOs: (os: string) => void;
};

const TrackingStateContext = createContext({} as ContextStateType);
const TrackingDispatchContext = createContext({} as ContextDispatchType);

const TrackingProvider: FC = (props) => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const [urlOs, setUrlOs] = useState<string | null>(null);
  const [os, setOs] = useState<OsType | null>(null);

  const getOs = useCallback(
    async (osId: string) => {
      try {
        setUrlOs(osId);
        setLoading(true);
        setError(null);
        setSuccess(false);
        const res = await getOrderService(osId);

        if (res) {
          setSuccess(true);
          setOs(res);
        } else {
          setError(`No se ha encontrado la OS ${osId}`);
        }
      } catch (e) {
        setError((e as Error).message);
        toast.error((e as Error).message, {
          position: 'top-center',
          autoClose: 2000,
        });
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setError, setOs, setSuccess, setUrlOs]
  );

  const values = useMemo(() => ({ getOs }), [getOs]);

  return (
    <TrackingStateContext.Provider
      value={{ isLoading, error, isSuccess, urlOs, os }}
    >
      <ToastContainer />
      <TrackingDispatchContext.Provider value={values} {...props} />
    </TrackingStateContext.Provider>
  );
};

const useTrackingState = (): ContextStateType => {
  const context = useContext(TrackingStateContext);
  if (!context) {
    throw new Error('TrackingState must be user within a TrackingProvider');
  }
  return context;
};

const useTrackingDispatch = (): ContextDispatchType => {
  const context = useContext(TrackingDispatchContext);
  if (!context) {
    throw new Error('TrackingDispatch must be user within a TrackingProvider');
  }
  return context;
};

export { TrackingProvider, useTrackingState, useTrackingDispatch };
