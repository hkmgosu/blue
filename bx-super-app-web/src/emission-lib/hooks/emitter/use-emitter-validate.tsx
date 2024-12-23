import { useState, useEffect } from 'react';
import { ValidationError } from 'yup';

import { emitterSchema } from '../../validations';
import { useEmitter } from './use-emitter';
import { useOrigin } from '../origin';
import { useRefund } from '../refund';
import { EmissionErrorMessage, EmissionValidate } from 'emission-lib/types';

export function useEmitterValidate(): EmissionValidate {
  const emitter = useEmitter();
  const [origin] = useOrigin();
  const [refund] = useRefund();
  const [validate, setValidate] = useState<EmissionValidate>({
    errors: undefined,
  });

  useEffect(() => {
    emitterSchema
      .validate(
        {
          emitter,
          refund,
          origin,
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
  }, [emitter, refund, origin]);

  return validate;
}
