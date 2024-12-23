import { FC, useState, useCallback, useEffect } from 'react';
import { GoogleMap, InfoWindow } from '@react-google-maps/api';
import { Marker } from './Marker';
import type { MarkerType } from '../types';

import styles from './maps.module.scss';

type MapsPropsType = {
  zoom?: number;
  mapContainerStyle?: any;
  center?: {
    lat: number;
    lng: number;
  };
  markers?: MarkerType[];
  infoWindow?: {
    content: string;
    position: {
      lat: number;
      lng: number;
    };
  };
};

const marker = {
  id: 'initial',
  lat: -33.4334882,
  lng: -70.797831917,
};

const GoogleMaps: FC<MapsPropsType> = ({
  center = {
    lat: 0,
    lng: 0,
  },
  zoom = 14,
  mapContainerStyle = {
    width: '100%',
    height: '400px',
  },
  markers = [],
  infoWindow,
}) => {
  const initialMarker = markers.length === 0 ? marker : null;
  const [infoWindowRef, setInfoWindow] = useState<google.maps.InfoWindow>();
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoadMap = useCallback((mapRef: google.maps.Map): void => {
    setMap(mapRef);
  }, []);
  const onLoadInfoWindow = useCallback((info: google.maps.InfoWindow): void => {
    setInfoWindow(info);
  }, []);

  useEffect(() => {
    if (infoWindow?.position.lng === 0 && infoWindow?.position.lat === 0) {
      infoWindowRef?.close();
    }
  }, [infoWindow?.position.lat, infoWindow?.position.lng, infoWindowRef]);

  const haveInfoWindow =
    infoWindow &&
    infoWindow.content !== '' &&
    infoWindow.position.lng !== 0 &&
    infoWindow.position.lat !== 0;

  return (
    <GoogleMap
      onLoad={onLoadMap}
      zoom={zoom}
      mapContainerStyle={mapContainerStyle}
      center={{
        lat: center.lat || -33.4334882,
        lng: center.lng || -70.797831917,
      }}
    >
      {initialMarker ? (
        <Marker {...initialMarker} id={marker.id} mapInstance={map} />
      ) : (
        markers.map((mark, index) => (
          <Marker
            key={index}
            {...mark}
            id={`${mark.id}:${index}`}
            mapInstance={map}
          />
        ))
      )}
      {haveInfoWindow && (
        <InfoWindow
          onLoad={onLoadInfoWindow}
          //onPositionChanged={() => infoWindowRef?.open(map!)}
          options={{
            pixelOffset: new google.maps.Size(0, -30),
            position: infoWindow?.position,
          }}
        >
          <div className={styles.infowindow}>{infoWindow?.content}</div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default GoogleMaps;
