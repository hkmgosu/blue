import NewShippingFormRegion from 'components/new-shipping/layout/region';
import { useShippingId } from 'emission-lib/hooks/shipping';
import { useShippingDestinyAddressRegion } from 'emission-lib/hooks/shipping-destiny';

function NewShippingFormDestinyRegion(): JSX.Element {
  const [region, setRegion] = useShippingDestinyAddressRegion();
  const shippingId = useShippingId();

  return (
    <NewShippingFormRegion
      regionIso={region.region_iso_3166}
      dispatchCommunesArr={setRegion}
      type='destino'
      regionKey={`new-shipping-destiny-regions-${shippingId}`}
    />
  );
}

export default NewShippingFormDestinyRegion;
