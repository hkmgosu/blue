import { useState, useEffect } from 'react';
import * as yup from 'yup';

type SchemaType = yup.AnyObjectSchema;
type ValueType = {
  [key: string]: string;
};

export const useSchemaValidation = (
  schema: SchemaType,
  value: ValueType
): boolean => {
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const validate = schema.isValidSync(value);
    setIsValid(validate);
  }, [schema, value]);

  return isValid;
};
