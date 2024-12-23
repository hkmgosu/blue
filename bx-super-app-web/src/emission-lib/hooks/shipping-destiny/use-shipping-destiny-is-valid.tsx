import { useState, useEffect } from 'react';

import { shippingDestinySchema } from '../../validations/shipping-destiny';
import { useShipping } from '../shipping/use-shipping';

export function useShippingDestinyIsValid(): boolean {
  const [shipping] = useShipping();
  const [isValid, setIsValid] = useState(false);
  useEffect(() => {
    shippingDestinySchema
      .validate({
        receiver: shipping.receiver,
        destiny: shipping.destiny,
        save_frequent_client: shipping.save_frequent_client,
        frequent_alias_client: shipping.frequent_alias_client,
      })
      .then(() => setIsValid(true))
      .catch(() => setIsValid(false));
  }, [shipping]);

  return isValid;
}
