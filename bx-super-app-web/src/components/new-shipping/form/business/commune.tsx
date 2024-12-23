import NewShippingLayoutCommune from '../../layout/commune';
import {
  useOriginAddressCommune,
  useOriginAddressGeolocation,
  useOriginAddressRegion,
} from 'emission-lib/hooks/origin';

function NewShippingFormBusinessCommune(): JSX.Element {
  const [originRegion] = useOriginAddressRegion();
  const [originCommune, setOriginCommune] = useOriginAddressCommune();
  const [, setOriginGeolocation] = useOriginAddressGeolocation();

  return (
    <NewShippingLayoutCommune
      regionIso={originRegion.region_iso_3166}
      communeCode={originCommune.code}
      dispatchCommunes={setOriginCommune}
      type='origen'
      communeKey='new-shipping-origin-communes'
      dispatchGeolocation={setOriginGeolocation}
    />
  );
}

export default NewShippingFormBusinessCommune;
