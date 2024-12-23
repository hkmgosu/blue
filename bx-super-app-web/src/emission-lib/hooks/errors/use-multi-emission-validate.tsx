import { useState, useEffect } from 'react';
import { ValidationError } from 'yup';

import { EmissionErrorMessage, EmissionValidate } from 'emission-lib/types';
import { shippingStatusSchema } from '../../validations';
import { useOrigin } from '../origin';
import { useRefund } from '../refund';
import { useShipping } from '../shipping';
import { useShippingSaveFrequentOrigin } from '../shipping-save';
import { useMultiEmissionIsValid } from './use-multi-emission-is-valid';

export function useMultiEmissionValidate(): EmissionValidate {
  const [validate, setValidate] = useState<EmissionValidate>({
    errors: undefined,
  });
  const [saveFrequentOrigin] = useShippingSaveFrequentOrigin();
  const [shipping] = useShipping();
  const [origin] = useOrigin();
  const [refund] = useRefund();
  const [, setIsValid] = useMultiEmissionIsValid();

  useEffect(() => {
    shippingStatusSchema
      .validate(
        {
          destiny: shipping.destiny,
          frequent_alias_client: shipping.frequent_alias_client,
          frequent_alias_package: shipping.frequent_alias_package,
          origin,
          package: shipping.package,
          receiver: shipping.receiver,
          refund,
          save_frequent_client: shipping.save_frequent_client,
          save_frequent_origin: saveFrequentOrigin,
          save_frequent_package: shipping.save_frequent_package,
          save_refund_address: shipping.save_refund_address,
        },
        { abortEarly: false }
      )
      .then(() => {
        setValidate({
          errors: undefined,
        });
        setIsValid(true);
      })
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

        setIsValid(false);
      });
  }, [origin, refund, shipping, saveFrequentOrigin, setIsValid]);

  return validate;
}
