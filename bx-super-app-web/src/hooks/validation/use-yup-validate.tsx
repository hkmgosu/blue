import { useState, useEffect, useMemo } from 'react';
import * as Yup from 'yup';

type ReturnHook = {
  isValid: boolean | null;
  error: string | null;
};

export const useYupValidate = (
  schema: Yup.AnyObjectSchema,
  value: {
    [key: string]: string | number;
  }
): ReturnHook => {
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const tries = useMemo(() => String(Object.values(value)[0]).length, [value]);

  useEffect(() => {
    if (tries === 0) {
      setIsValid(null);
      setError(null);
      return;
    }
    const asyncValidate = async (): Promise<void> => {
      try {
        const res = await schema.validate(value);

        if (res) {
          setIsValid(true);
        }
      } catch (err) {
        setIsValid(false);
        setError((err as Error).message);
      }
    };
    asyncValidate();
  }, [value, schema, tries]);

  return {
    isValid,
    error,
  };
};
