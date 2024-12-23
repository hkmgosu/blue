import { useEffect } from 'react';

import { useGetCommuneByCoordinates } from 'hooks/locations/use-get-commune-by-coordinates';
import {
  useShippingDestinyAddressCommune,
  useShippingDestinyAddressGeolocation,
  useShippingDestinyAddressRegion,
} from 'emission-lib/hooks/shipping-destiny';
import { useShippingId } from 'emission-lib/hooks/shipping';
import { locationsRegions } from 'emission-lib/utils';

function NewShippingFormDestinyGoogleCommune(): JSX.Element {
  const [geolocation] = useShippingDestinyAddressGeolocation();
  const shippingId = useShippingId();
  const { isSuccess, commune, refetch } = useGetCommuneByCoordinates(
    geolocation,
    `commune-by-coordinates-${shippingId}`
  );
  const [, setCommune] = useShippingDestinyAddressCommune();
  const [, setRegion] = useShippingDestinyAddressRegion();

  useEffect(() => {
    if (isSuccess && commune) {
      setCommune((prev) => ({
        ...prev,
        name: commune.name,
        code: commune.code,
        base_post: commune.base_post,
        base_name: commune.base_name,
        zone: commune.zone,
        location_code: commune.location_code,
      }));
      if (locationsRegions) {
        const regionFound = locationsRegions.find(
          (regg) => regg.region_iso_3166 === commune.region
        );
        if (regionFound) {
          setRegion((prev) => ({
            ...prev,
            region_iso_3166: regionFound.region_iso_3166,
            country: regionFound.country,
            name: regionFound.name,
            region_number: regionFound.region_number,
          }));
        }
      }
    }
  }, [isSuccess, commune, setCommune, setRegion]);

  useEffect(() => {
    if (geolocation) {
      refetch();
    }
  }, [geolocation, refetch]);

  return <></>;
}

export default NewShippingFormDestinyGoogleCommune;
