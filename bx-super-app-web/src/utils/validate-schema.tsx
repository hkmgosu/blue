import * as Yup from 'yup';

type ReturnValidate = {
  isValid: boolean | null;
  error: string | null;
};

export const validateSchema = async (
  schema: Yup.AnyObjectSchema,
  value: {
    [key: string]: string;
  }
): Promise<ReturnValidate> => {
  const tries = Object.values(value)[0].length;
  if (tries === 0) {
    return {
      isValid: null,
      error: null,
    };
  }
  try {
    const res = await schema.validate(value);
    if (res) {
      return {
        isValid: true,
        error: null,
      };
    }
    return {
      isValid: true,
      error: null,
    };
  } catch (err) {
    return {
      isValid: false,
      error: (err as Error).message,
    };
  }
};
