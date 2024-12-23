import { GoogleMap } from 'components/google-maps/Maps';
import { useShippingDestinyAddressGeolocation } from 'emission-lib/hooks/shipping-destiny';
import { useShippingId } from 'emission-lib/hooks/shipping';

function NewShippingLayoutDestinyAddressDomicileMap(): JSX.Element {
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
        height: '350px',
      }}
    />
  );
}

export default NewShippingLayoutDestinyAddressDomicileMap;
