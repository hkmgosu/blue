import { useState, useEffect } from 'react';

import { emitterSchema } from '../../validations';
import { useEmitter } from './use-emitter';
import { useOrigin } from '../origin';
import { useRefund } from '../refund';

export function useEmitterIsValid(): boolean {
  const [isValid, setIsValid] = useState(false);
  const emitter = useEmitter();
  const [origin] = useOrigin();
  const [refund] = useRefund();

  useEffect(() => {
    emitterSchema
      .validate({
        emitter,
        refund,
        origin,
      })
      .then(() => setIsValid(true))
      .catch(() => setIsValid(false));
  }, [emitter, refund, origin]);

  return isValid;
}
