import { useReducer, useEffect, useCallback } from 'react';
import * as Yup from 'yup';

enum ActionEnum {
  SET_VALUES = 'SET_VALUES',
  SET_ERROR = 'SET_ERROR',
}

export interface ValidationValues {
  [field: string]: any;
}

type ValuesType<Values> = {
  [K in keyof Values]: Values[K] | null;
};

type ErrorsType = {
  [field: string]: string | boolean;
};

type UseValidationSchemaType<Values> = {
  values: Values;
  errors: ErrorsType;
};

type StateType<Values> = {
  values: ValuesType<Values>;
  errors: ErrorsType;
};

type ActionType<Values> =
  | {
      type: ActionEnum.SET_VALUES;
      payload: ValuesType<Values>;
    }
  | {
      type: ActionEnum.SET_ERROR;
      payload: {
        path: any;
        error: string | boolean;
      };
    };

const reducer = <Values,>(
  state: StateType<Values>,
  action: ActionType<Values>
): StateType<Values> => {
  switch (action.type) {
    case ActionEnum.SET_VALUES: {
      return { ...state, values: action.payload };
    }
    case ActionEnum.SET_ERROR: {
      let newErrors = { ...state.errors };
      newErrors[action.payload.path] = action.payload.error;
      return { ...state, errors: newErrors };
    }
    default:
      return state;
  }
};

const init = <Values,>(values: ValuesType<Values>): StateType<Values> => {
  const getPaths = Object.keys(values);
  const errors = Object.fromEntries(
    getPaths.map((path: string) => [path, false])
  );
  return {
    values,
    errors,
  };
};

const emptyErrors = {};

const useValidateSchema = <Values extends ValidationValues = ValidationValues>(
  values: ValuesType<Values>,
  schema: Yup.AnyObjectSchema
): UseValidationSchemaType<Values> => {
  const [state, dispatch] = useReducer(
    reducer,
    {
      values,
      errors: emptyErrors,
    },
    () => init(values)
  );

  const asyncFn = useCallback(
    async (response) => {
      const paths = Object.keys(response);
      return await Promise.all(
        paths.map(async (path) => {
          try {
            const validate = await schema.validateAt(path, response);
            if (validate) {
              dispatch({
                type: ActionEnum.SET_ERROR,
                payload: { path, error: false },
              });
            }
          } catch (error) {
            dispatch({
              type: ActionEnum.SET_ERROR,
              payload: { path, error: (error as Error).message },
            });
          }
        })
      );
    },
    [schema]
  );

  useEffect(() => {
    if (JSON.stringify(state.values) !== JSON.stringify(values)) {
      dispatch({ type: ActionEnum.SET_VALUES, payload: values });
      asyncFn(values);
    }
  }, [state, asyncFn, values]);

  return state as UseValidationSchemaType<Values>;
};

export { useValidateSchema };
