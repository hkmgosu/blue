import { FC, useCallback } from 'react';
import { Marker as GoogleMarker } from '@react-google-maps/api';

import type { MarkerType } from '../types';
import { geocodeByCords } from '../util';

export const Marker: FC<
  MarkerType & { mapInstance: google.maps.Map | null }
> = ({ lat, lng, id, onClick, onClickWithGeocode, mapInstance, title }) => {
  const handleClick = useCallback(
    async (event: google.maps.MapMouseEvent): Promise<void> => {
      mapInstance?.setCenter({ lat, lng });

      if (onClickWithGeocode) {
        const response = await geocodeByCords({
          latitude: event.latLng.lat(),
          longitude: event.latLng.lng(),
        });

        return onClickWithGeocode(response);
      }

      if (onClick) {
        return onClick();
      }
    },
    [lat, lng, mapInstance, onClick, onClickWithGeocode]
  );

  return (
    <GoogleMarker
      key={id}
      position={{
        lat: lat || -33.4334882,
        lng: lng || -70.797831917,
      }}
      onClick={handleClick}
      title={title}
    />
  );
};
