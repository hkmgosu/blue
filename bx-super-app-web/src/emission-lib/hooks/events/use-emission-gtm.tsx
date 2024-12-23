import { useEffect } from 'react';
import { useStep } from '../emission-state';
import { sendEvent } from 'utils/gtm';
import { TShippingPaths } from 'config';

type Props = {
  type: TShippingPaths;
};

export function useEmissionGtm({ type }: Props): void {
  const [step] = useStep();

  useEffect(() => {
    sendEvent({
      event: 'new_shipment',
      shipment_type: type,
      emission_step: String(step),
    });
  }, [step, type]);
}
