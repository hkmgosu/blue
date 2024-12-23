import { useState, useEffect } from 'react';

import { useEmissionDto } from './use-emission-dto';
import { emissionStatusSchema } from '../../validations/emission-status';
import { useTax } from '../pricing/use-tax';
import { usePrice } from '../pricing/use-price';
import { useTotalPrice } from '../pricing/use-total-price';
import { useWarranty } from '../pricing/use-warranty';

export function useEmissionDtoIsValid(): boolean {
  const [isValid, setIsValid] = useState(false);
  const dto = useEmissionDto();
  useTax();
  usePrice();
  useTotalPrice();
  useWarranty();

  useEffect(() => {
    emissionStatusSchema
      .validate(dto)
      .then(() => setIsValid(true))
      .catch(() => setIsValid(false));
  }, [dto]);

  return isValid;
}
