import { useState, useEffect } from 'react';

import { shippingStatusSchema } from '../../validations';
import { useShipping } from './use-shipping';
import { useOrigin } from '../origin/use-origin';
import { useRefund } from '../refund/use-refund';
import { useShippingSaveFrequentOrigin } from '../shipping-save';

export function useShippingStatus(): boolean {
  const [saveFrequentOrigin] = useShippingSaveFrequentOrigin();
  const [shipping] = useShipping();
  const [origin] = useOrigin();
  const [refund] = useRefund();
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    shippingStatusSchema
      .validate({
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
      })
      .then(() => setIsValid(true))
      .catch(() => setIsValid(false));
  }, [origin, refund, shipping, saveFrequentOrigin]);

  return isValid;
}
