import { useReducer, useCallback } from 'react';

enum ActionEnum {
  SET_LOADING = 'SET_LOADING',
  REGISTER_SUCCESS = 'REGISTER_SUCCESS',
  SET_ERROR = 'SET_ERROR',
}

type ActionType =
  | {
      type: ActionEnum.SET_LOADING;
      payload: boolean;
    }
  | { type: ActionEnum.REGISTER_SUCCESS }
  | { type: ActionEnum.SET_ERROR; payload: string };

type StateType = {
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
};

const registerReducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case ActionEnum.SET_LOADING: {
      return { ...state, isLoading: action.payload };
    }
    case ActionEnum.REGISTER_SUCCESS: {
      return { ...state, isSuccess: true, error: null };
    }
    case ActionEnum.SET_ERROR: {
      return { ...state, isSuccess: false, error: action.payload };
    }
    default:
      return state;
  }
};

const initialState: StateType = {
  isLoading: false,
  error: null,
  isSuccess: false,
};

type UsePymeRegisterApiType = {
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
  setLoading: (loading: boolean) => void;
  setSuccess: () => void;
  setError: (error: string) => void;
};

const usePymeRegisterApi = (): UsePymeRegisterApiType => {
  const [{ isLoading, error, isSuccess }, dispatch] = useReducer(
    registerReducer,
    initialState
  );

  const setLoading = useCallback(
    (loading: boolean) =>
      dispatch({ type: ActionEnum.SET_LOADING, payload: loading }),
    []
  );

  const setSuccess = useCallback(
    () => dispatch({ type: ActionEnum.REGISTER_SUCCESS }),
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

  return {
    isLoading,
    error,
    isSuccess,
    setLoading,
    setSuccess,
    setError,
  };
};

export { usePymeRegisterApi };
