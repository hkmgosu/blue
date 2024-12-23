import NewShippingLayoutCommuneDestiny from 'components/new-shipping/layout/commune';
import {
  useShippingDestinyAddressRegion,
  useShippingDestinyAddressCommune,
} from 'emission-lib/hooks/shipping-destiny';
import { useShippingId } from 'emission-lib/hooks/shipping';

function NewShippingFormDestinyCommune(): JSX.Element {
  const [receiverRegion] = useShippingDestinyAddressRegion();
  const shippingId = useShippingId();
  const [receiverCommune, setReceiverCommune] =
    useShippingDestinyAddressCommune();

  return (
    <NewShippingLayoutCommuneDestiny
      regionIso={receiverRegion.region_iso_3166}
      communeCode={receiverCommune.code}
      dispatchCommunesArr={setReceiverCommune}
      type='destino'
      communeKey={`new-shipping-destiny-communes-${shippingId}`}
    />
  );
}

export default NewShippingFormDestinyCommune;
