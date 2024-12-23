import NewShippingLayoutAgenciesMulti from 'components/new-shipping/layout/agencies-multi';
import { useShippingId } from 'emission-lib/hooks/shipping';

function NewShippingLayoutCurrentItemDestinyAgenciesMulti(): JSX.Element {
  const shippingId = useShippingId();
  return (
    <NewShippingLayoutAgenciesMulti
      cacheKey={`new-shipping-agencies-${shippingId}`}
    />
  );
}

export default NewShippingLayoutCurrentItemDestinyAgenciesMulti;
