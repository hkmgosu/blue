import { getEmission } from 'api/emissions/emission';
import { useCallback, useReducer } from 'react';
import { toast } from 'react-toastify';

import type { EmissionType } from 'types/emissions';

enum ActionEnum {
  CHANGE_STEP = 'CHANGE_STEP',
  SET_LOADING = 'SET_LOADING',
  SET_SUCCESS = 'SET_SUCCESS',
  SET_ERROR = 'REGISTER_ERROR',
  SET_EMISSION_ID = 'SET_EMISSION_ID',
  SET_EMISSION = 'SET_EMISSION',
}

type ActionType =
  | { type: ActionEnum.CHANGE_STEP; payload: number }
  | {
      type: ActionEnum.SET_LOADING;
      payload: boolean;
    }
  | { type: ActionEnum.SET_SUCCESS }
  | { type: ActionEnum.SET_ERROR; payload: string }
  | { type: ActionEnum.SET_EMISSION_ID; payload: string }
  | { type: ActionEnum.SET_EMISSION; payload: EmissionType };

export enum Size {
  none = 'none',
  S = 'S',
  M = 'M',
  L = 'L',
}

type StateType = {
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
  step: number;
  emissionId: string;
  emission: EmissionType | null;
};

const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case ActionEnum.CHANGE_STEP: {
      return { ...state, step: action.payload };
    }
    case ActionEnum.SET_LOADING: {
      return { ...state, isLoading: action.payload };
    }
    case ActionEnum.SET_SUCCESS: {
      return { ...state, isSuccess: true };
    }
    case ActionEnum.SET_ERROR: {
      return { ...state, error: action.payload };
    }
    case ActionEnum.SET_EMISSION_ID: {
      return { ...state, emissionId: action.payload };
    }
    case ActionEnum.SET_EMISSION: {
      return { ...state, emission: action.payload };
    }
    default:
      return state;
  }
};

const initialState: StateType = {
  isLoading: false,
  error: null,
  isSuccess: false,
  step: 1,
  emissionId: '',
  emission: null,
};

type UseType = {
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
  step: number;
  emissionId: string;
  emission: EmissionType | null;
  setLoading: (loading: boolean) => void;
  setSuccess: () => void;
  setError: (error: string) => void;
  changeStep: (step: number) => void;
  changeEmissionId: (emissionId: string) => void;
  getCurrentEmission: (emissionId: string) => void;
};

const useEmissions = (): UseType => {
  const [
    { isLoading, error, isSuccess, step, emissionId, emission },
    dispatch,
  ] = useReducer(reducer, initialState);

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

  const changeStep = useCallback((stepNumber: number) => {
    dispatch({
      type: ActionEnum.CHANGE_STEP,
      payload: stepNumber,
    });
  }, []);

  const changeEmissionId = useCallback((currentEmissionId: string) => {
    dispatch({
      type: ActionEnum.SET_EMISSION_ID,
      payload: currentEmissionId,
    });
  }, []);

  const getCurrentEmission = useCallback(async (emiId: string) => {
    dispatch({ type: ActionEnum.SET_LOADING, payload: true });
    try {
      const _emission = await getEmission(emiId);
      if (_emission) {
        dispatch({ type: ActionEnum.SET_EMISSION, payload: _emission });
      } else {
        const errorMessage = 'no se encontro la emision';
        dispatch({
          type: ActionEnum.SET_ERROR,
          payload: errorMessage,
        });
        toast.error(errorMessage, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    } catch (err) {
      dispatch({
        type: ActionEnum.SET_ERROR,
        payload: (err as Error).message,
      });
      toast.error((err as Error).message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
    dispatch({ type: ActionEnum.SET_LOADING, payload: false });
  }, []);

  return {
    isLoading,
    error,
    isSuccess,
    step,
    emissionId,
    emission,
    setLoading,
    setSuccess,
    setError,
    changeStep,
    changeEmissionId,
    getCurrentEmission,
  };
};

export { useEmissions };
