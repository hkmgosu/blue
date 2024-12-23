import { useState, useEffect } from 'react';
import { ValidationError } from 'yup';

import { shippingDestinySchema } from '../../validations/shipping-destiny';
import { useShipping } from '../shipping/use-shipping';
import { EmissionErrorMessage, EmissionValidate } from '../../types';

export function useShippingDestinyValidate(): EmissionValidate {
  const [shipping] = useShipping();
  const [validate, setValidate] = useState<EmissionValidate>({
    errors: undefined,
  });
  useEffect(() => {
    shippingDestinySchema
      .validate(
        {
          receiver: shipping.receiver,
          destiny: shipping.destiny,
          save_frequent_client: shipping.save_frequent_client,
          frequent_alias_client: shipping.frequent_alias_client,
        },
        {
          abortEarly: false,
        }
      )
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
  }, [shipping]);

  return validate;
}
