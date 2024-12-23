import { useMemo } from 'react';

import { GoogleMap } from 'components/google-maps/Maps';
import type { AgencyType } from 'types/locations';
import { useAgenciesByCommuneCode } from 'hooks/locations/use-agencies-by-commune-code';
import { useShippingDestiny } from 'emission-lib/hooks/shipping-destiny';

type Props = {
  cacheKey: string;
};

export default function NewShippingLayoutAgenciesMultiMap({
  cacheKey,
}: Props): JSX.Element {
  const [destiny, setDestiny] = useShippingDestiny();
  const { agencies } = useAgenciesByCommuneCode({
    commune_code: destiny.address.commune.code,
    cacheKey: cacheKey,
  });
  const centerMap = useMemo(
    () => ({
      geolocation: {
        lat: destiny.address.geolocation.latitude,
        lng: destiny.address.geolocation.longitude,
      },
      zoom: 13,
    }),
    [
      destiny.address.geolocation.latitude,
      destiny.address.geolocation.longitude,
    ]
  );

  const handleClickMarker = (agency: AgencyType): void => {
    setDestiny((prev) => ({
      ...prev,
      agency_id: agency.agency_id,
      agency_name: agency.agency_name,
      country_name: agency.location.country_name,
      state_name: agency.location.state_name,
      city_name: agency.location.city_name,
      street_name: agency.location.street_name,
      street_number: agency.location.street_number,
      geolocation: agency.location.geolocation,
    }));
  };
  return (
    <GoogleMap
      markers={agencies?.map((agency) => {
        return {
          id: agency.agency_id,
          lat: agency.location.geolocation.latitude,
          lng: agency.location.geolocation.longitude,
          onClick: () => handleClickMarker(agency),
          title: agency.agency_name,
        };
      })}
      center={centerMap.geolocation}
      mapContainerStyle={{
        width: '100%',
        height: '180px',
      }}
      zoom={centerMap.zoom}
      infoWindow={{
        content: destiny.agency_name,
        position: {
          lat: destiny.address.geolocation.latitude,
          lng: destiny.address.geolocation.longitude,
        },
      }}
    />
  );
}
