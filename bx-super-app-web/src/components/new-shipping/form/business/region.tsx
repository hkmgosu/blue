import NewShippingFormRegion from '../../layout/region';
import { useOriginAddressRegion } from 'emission-lib/hooks/origin';

function NewShippingFormBusinessRegion(): JSX.Element {
  const [originRegion, setOriginRegion] = useOriginAddressRegion();

  return (
    <NewShippingFormRegion
      regionIso={originRegion.region_iso_3166}
      dispatchCommunes={setOriginRegion}
      type='origen'
      regionKey='new-shipping-origin-regions'
    />
  );
}

export default NewShippingFormBusinessRegion;
