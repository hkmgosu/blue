import { useCallback, useReducer } from 'react';

import { OsType } from 'types/tracking';

enum ActionEnum {
  SET_LOADING = 'SET_LOADING',
  SET_SUCCESS = 'SET_SUCCESS',
  SET_ERROR = 'REGISTER_ERROR',
  SET_OS = 'SET_OS',
  SET_URL_OS = 'SET_URL_OS',
}

type ActionType =
  | {
      type: ActionEnum.SET_LOADING;
      payload: boolean;
    }
  | { type: ActionEnum.SET_SUCCESS }
  | { type: ActionEnum.SET_ERROR; payload: string }
  | { type: ActionEnum.SET_OS; payload: OsType }
  | { type: ActionEnum.SET_URL_OS; payload: string };

type StateType = {
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
  os: OsType | null;
  urlOs: string | null;
};

type useTrackingApiType = {
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
  os: OsType | null;
  urlOs: string | null;
  setLoading: (loading: boolean) => void;
  setSuccess: () => void;
  setError: (error: string) => void;
  setOs: (os: OsType) => void;
  setUrlOs: (urlOs: string) => void;
};

const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case ActionEnum.SET_LOADING: {
      return { ...state, isLoading: action.payload };
    }
    case ActionEnum.SET_SUCCESS: {
      return { ...state, isSuccess: true };
    }
    case ActionEnum.SET_ERROR: {
      return { ...state, error: action.payload };
    }
    case ActionEnum.SET_OS: {
      return { ...state, os: action.payload };
    }
    case ActionEnum.SET_URL_OS: {
      return { ...state, urlOs: action.payload };
    }

    default:
      return state;
  }
};

const initialState: StateType = {
  isLoading: false,
  error: null,
  isSuccess: false,
  os: null,
  urlOs: null,
};

const useTrackingApi = (): useTrackingApiType => {
  const [{ isLoading, error, isSuccess, os, urlOs }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const setLoading = useCallback(
    (loading: boolean) =>
      dispatch({ type: ActionEnum.SET_LOADING, payload: loading }),
    []
  );

  const setSuccess = useCallback(
    () => dispatch({ type: ActionEnum.SET_SUCCESS }),
    []
  );

  const setError = useCallback(
    (err: string) =>
      dispatch({
        type: ActionEnum.SET_ERROR,
        payload: err,
      }),
    []
  );

  const setOs = useCallback((osOnSet: OsType) => {
    dispatch({
      type: ActionEnum.SET_OS,
      payload: osOnSet,
    });
  }, []);

  const setUrlOs = useCallback((id: string) => {
    dispatch({
      type: ActionEnum.SET_URL_OS,
      payload: id,
    });
  }, []);

  return {
    isLoading,
    error,
    isSuccess,
    os,
    urlOs,
    setLoading,
    setSuccess,
    setError,
    setOs,
    setUrlOs,
  };
};

export { useTrackingApi };
