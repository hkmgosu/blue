import { useState, useCallback, useEffect } from 'react';

import styles from 'components/new-shipping/form/business/styles.module.css';
import { Label } from 'components/ui-bx/forms';
import { Tooltip } from 'components/ui-bx/tooltip';
import NewShippingInfo from 'components/new-shipping/icons/info';
import { GoogleAutocomplete } from 'components/google-maps/Autocomplete';
import { AdapterGeocodingWithInputValueType } from 'components/google-maps/types';
import { useRefund } from 'emission-lib/hooks/refund';
import { useRegionsCache } from 'hooks/locations-cache/use-regions-cache';
import { useComunesCache } from 'hooks/locations-cache/use-communes-cache';
import { useGetCommuneByCoordinates } from 'hooks/locations/use-get-commune-by-coordinates';
import {
  stateToRegionName,
  ChileanStatesType,
} from 'components/new-shipping/utils/state-to-region-name';

const addressResponseCache = JSON.parse(
  window.localStorage.getItem('address-emitter-google-response-form') || '{}'
);
const regionLocationResponseCache = JSON.parse(
  window.localStorage.getItem('region-emitter-google-response-form') || '{}'
);
const communeLocationResponseCache = JSON.parse(
  window.localStorage.getItem('commune-emitter-location-response-form') || '{}'
);

function NewShippingFormBusinessRefund(): JSX.Element {
  const [refund, setRefund] = useRefund();
  const [refundAddress, setRefundAddress] = useState(() =>
    refund.address.street
      ? `${refund.address.street} ${refund.address.street_number}, ${refund.address.city}`
      : ''
  );

  const [geolocation, setGeolocation] = useState(
    () =>
      addressResponseCache?.location || {
        latitude: 0,
        longitude: 0,
      }
  );

  const { commune, isLoading, refetch } =
    useGetCommuneByCoordinates(geolocation);

  useEffect(() => {
    if (
      !isLoading &&
      communeLocationResponseCache.base_name &&
      addressResponseCache.location &&
      regionLocationResponseCache.name
    ) {
      setRefund((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          commune: {
            base_name: communeLocationResponseCache.base_name,
            base_post: communeLocationResponseCache.base_post,
            code: communeLocationResponseCache.code,
            location_code: communeLocationResponseCache.location_code,
            name: communeLocationResponseCache.name,
            zone: communeLocationResponseCache.zone,
          },
          city: addressResponseCache.city,
          country: addressResponseCache.country,
          geolocation: addressResponseCache.location,
          region: {
            name: regionLocationResponseCache.name,
            region_iso_3166: regionLocationResponseCache.region_iso_3166,
            country: regionLocationResponseCache.country,
            region_number: regionLocationResponseCache.region_number,
          },
          street: addressResponseCache.street,
          street_number: String(addressResponseCache.number),
        },
      }));
      setGeolocation(addressResponseCache.location);
    }
  }, [setRefund, setGeolocation, commune, isLoading]);

  useEffect(() => {
    setRefundAddress(
      window.localStorage.getItem('address-emitter-form') || refundAddress
    );
    if (
      !commune &&
      !isLoading &&
      !communeLocationResponseCache.base_name &&
      !addressResponseCache.location &&
      !regionLocationResponseCache.name
    ) {
      setRefundAddress('');
    }
  }, [commune, isLoading, refundAddress]);

  useEffect(() => {
    refetch();
  }, [geolocation.latitude, geolocation.longitude, refetch]);

  const { isLoading: isLoadingRegions, regions } = useRegionsCache();
  const { isLoading: isLoadingCommunes, communes } = useComunesCache();

  const onSelectHandler = useCallback(
    (addressResponse: AdapterGeocodingWithInputValueType) => {
      if (addressResponse) {
        window.localStorage.setItem(
          'address-emitter-form',
          addressResponse.address
        );
        window.localStorage.setItem(
          'address-emitter-google-response-form',
          JSON.stringify(addressResponse)
        );
        setGeolocation(addressResponse.location);
        setRefundAddress(addressResponse.address);
        setRefund((prev) => ({
          ...prev,
          address: {
            ...prev.address,
            city: addressResponse.city,
            commune: {
              ...prev.address.commune,
            },
            country: addressResponse.country,
            geolocation: addressResponse.location,
            region: {
              ...prev.address.region,
              name: addressResponse.state,
            },
            street: addressResponse.street,
            street_number: String(addressResponse.number),
          },
        }));

        if (!isLoadingRegions && !isLoadingCommunes) {
          const regionFound = regions?.find((reg) =>
            reg.name.includes(
              stateToRegionName(addressResponse.state as ChileanStatesType)
            )
          );

          const communeFound = communes?.find((com) =>
            com.name.includes(addressResponse.commune)
          );

          if (regionFound && communeFound) {
            window.localStorage.setItem(
              'region-emitter-google-response-form',
              JSON.stringify(regionFound)
            );

            window.localStorage.setItem(
              'commune-emitter-location-response-form',
              JSON.stringify(communeFound)
            );

            setRefund((prev) => ({
              ...prev,
              address: {
                ...prev.address,
                region: {
                  name: regionFound.name,
                  region_iso_3166: regionFound.region_iso_3166,
                  country: regionFound.country,
                  region_number: regionFound.region_number,
                },
                commune: {
                  base_name: communeFound.base_name,
                  base_post: communeFound.base_post,
                  code: communeFound.code,
                  location_code: communeFound.location_code,
                  name: communeFound.name,
                  zone: communeFound.zone,
                },
              },
            }));
          }
        }
      }
    },
    [
      setRefundAddress,
      setRefund,
      isLoadingRegions,
      regions,
      isLoadingCommunes,
      communes,
    ]
  );

  return (
    <>
      <Tooltip
        content='Ingresa una dirección del remitente. La utilizaremos para generar el retorno del envío en caso de que no encontremos al destinario.'
        direction='right'
        style={{ left: 'calc(34% + 10px)' }}
      >
        <Label
          htmlFor='business-refund-address'
          className='flex items-center mb-2'
        >
          Dirección del remitente <span className={styles.required}>*</span>
          <span className={styles.IconContainer}>
            <NewShippingInfo color='black' size='15' />
          </span>
        </Label>
      </Tooltip>
      <GoogleAutocomplete
        placeholder='Ej: Pudeto 2070'
        onSelect={onSelectHandler}
        value={refundAddress}
      />
    </>
  );
}

export default NewShippingFormBusinessRefund;
