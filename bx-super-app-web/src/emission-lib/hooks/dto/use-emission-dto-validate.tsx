import { useState, useEffect } from 'react';
import { ValidationError } from 'yup';

import { useEmissionDto } from './use-emission-dto';
import { emissionStatusSchema } from '../../validations/emission-status';
import { useTax } from '../pricing/use-tax';
import { usePrice } from '../pricing/use-price';
import { useTotalPrice } from '../pricing/use-total-price';
import { useWarranty } from '../pricing/use-warranty';
import { EmissionErrorMessage, EmissionValidate } from 'emission-lib/types';

export function useEmissionDtoValidate(): EmissionValidate {
  const [validate, setValidate] = useState<EmissionValidate>({
    errors: undefined,
  });
  const dto = useEmissionDto();
  useTax();
  usePrice();
  useTotalPrice();
  useWarranty();

  useEffect(() => {
    emissionStatusSchema
      .validate(dto, {
        abortEarly: false,
      })
      .then(() =>
        setValidate({
          errors: undefined,
        })
      )
      .catch((err) => {
        const errors = (err.inner as ValidationError[]).map((singleErr) => {
          return {
            message: singleErr.message,
            path: singleErr.path,
          } as EmissionErrorMessage;
        });
        setValidate({
          errors,
        });
      });
  }, [dto]);

  return validate;
}
