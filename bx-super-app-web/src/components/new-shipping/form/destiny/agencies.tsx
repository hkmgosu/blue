import NewShippingLayoutAgenciesMulti from 'components/new-shipping/layout/agencies-multi';
import { useShippingId } from 'emission-lib/hooks/shipping';

function NewShippingFormDestinyAgencies(): JSX.Element {
  const shippingId = useShippingId();
  return (
    <NewShippingLayoutAgenciesMulti
      cacheKey={`new-shipping-destiny-agencies-${shippingId}`}
    />
  );
}

export default NewShippingFormDestinyAgencies;
