import { GoogleMap } from 'components/google-maps/Maps';
import { useShippingId } from 'emission-lib/hooks/shipping';
import { useShippingDestinyAddressGeolocation } from 'emission-lib/hooks/shipping-destiny';

function NewShippingLayoutDestinyDomicileMapMulti(): JSX.Element {
  const [geolocation] = useShippingDestinyAddressGeolocation();
  const shippingId = useShippingId();
  return (
    <GoogleMap
      markers={[
        {
          id: shippingId,
          lat: geolocation.latitude,
          lng: geolocation.longitude,
        },
      ]}
      center={{
        lat: geolocation.latitude,
        lng: geolocation.longitude,
      }}
      mapContainerStyle={{
        width: '100%',
        height: '400px',
      }}
    />
  );
}

export default NewShippingLayoutDestinyDomicileMapMulti;
