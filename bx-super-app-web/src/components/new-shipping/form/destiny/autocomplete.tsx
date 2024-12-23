import { useCallback } from 'react';

import styles from 'components/new-shipping/form/destiny/autocomplete.module.scss';
import { FormText } from 'components/ui-bx/forms';
import { GoogleAutocomplete } from 'components/google-maps/Autocomplete';
import { AdapterGeocodingWithInputValueType } from 'components/google-maps/types';
import NewShippingFormDestinyGoogleCommune from 'components/new-shipping/form/destiny/google-commune';
import { useShippingDestiny } from 'emission-lib/hooks/shipping-destiny';

function NewShippingFormDestinyAutocomplete(): JSX.Element {
  const [destiny, setDestiny] = useShippingDestiny();

  const onSelectHandler = useCallback(
    (addressResponse: AdapterGeocodingWithInputValueType) => {
      if (addressResponse) {
        setDestiny((prev) => ({
          ...prev,
          address: {
            ...prev.address,
            geolocation: addressResponse.location,
            city: addressResponse.city,
            street: addressResponse.street,
            street_number: String(addressResponse?.number),
            country: addressResponse?.country,
            region: {
              ...prev.address.region,
              name: addressResponse.state,
            },
            commune: {
              ...prev.address.commune,
              name: addressResponse.commune,
            },
          },
        }));
      }
    },
    [setDestiny]
  );

  return (
    <>
      <div>
        Ingresa dirección exacta<span className={styles.required}>*</span>
      </div>
      <FormText>(Calle / Avenida / Pasaje - Número - Comuna)</FormText>
      <GoogleAutocomplete
        placeholder='Ej: Pudeto 2070'
        onSelect={onSelectHandler}
        value={
          destiny.address.street !== '' && !destiny.isPickup
            ? `${destiny.address.street} ${destiny.address.street_number}, ${destiny.address.city}`
            : ''
        }
        prevDataProp={
          destiny.address.street
            ? {
                address: destiny.address.street,
                location: destiny.address.geolocation,
                number: Number(destiny.address.street_number),
                street: destiny.address.street,
                city: destiny.address.city,
                county: destiny.address.country,
                country: destiny.address.country,
                commune: destiny.address.commune.name,
                state: destiny.address.region.name,
              }
            : null
        }
      />
      <NewShippingFormDestinyGoogleCommune />
    </>
  );
}

export default NewShippingFormDestinyAutocomplete;
