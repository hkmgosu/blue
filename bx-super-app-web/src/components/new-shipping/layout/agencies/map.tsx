import { useEffect, useMemo, useCallback } from 'react';

import { useAgenciesByCommuneCode } from 'hooks/locations/use-agencies-by-commune-code';
import { GoogleMap } from 'components/google-maps/Maps';

import type { AgencyType } from 'types/locations';
import { useOrigin } from 'emission-lib/hooks/origin';

type Props = {
  cacheKey: string;
};

export default function NewShippingLayoutAgenciesMap({
  cacheKey,
}: Props): JSX.Element {
  const [origin, setOrigin] = useOrigin();
  const { agencies, refetch } = useAgenciesByCommuneCode({
    commune_code: origin.address.commune.code,
    cacheKey: cacheKey,
  });

  useEffect(() => {
    refetch();
  }, [origin.address.commune.code, agencies, refetch]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const centerMap = useMemo(
    () => ({
      geolocation: {
        lat: origin.address.geolocation.latitude,
        lng: origin.address.geolocation.longitude,
      },
      zoom: 13,
    }),
    [origin.address.geolocation.latitude, origin.address.geolocation.longitude]
  );

  const handleClickMarker = useCallback(
    (agency: AgencyType) => {
      setOrigin((prev) => ({
        ...prev,
        agency_id: agency.agency_id,
        agency_name: agency.agency_name,
        address: {
          ...prev.address,
          city: agency.location.city_name,
          country: agency.location.country_name,
          geolocation: agency.location.geolocation,
          street: agency.location.street_name,
          street_number: agency.location.street_number,
        },
      }));
    },
    [setOrigin]
  );
  return (
    <GoogleMap
      markers={agencies?.map((agency) => ({
        id: agency.agency_id,
        lat: agency.location.geolocation.latitude,
        lng: agency.location.geolocation.longitude,
        onClick: () => handleClickMarker(agency),
        title: agency.agency_name,
      }))}
      center={centerMap.geolocation}
      mapContainerStyle={{
        width: '100%',
        height: '263px',
      }}
      zoom={centerMap.zoom}
      infoWindow={{
        content: origin.agency_name,
        position: {
          lat: origin.address.geolocation.latitude,
          lng: origin.address.geolocation.longitude,
        },
      }}
    />
  );
}
