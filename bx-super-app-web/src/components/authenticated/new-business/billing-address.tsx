import { useCallback } from 'react';
import { useAtom } from 'jotai';
import { Col } from '@bx-design/react-grid';
import styles from './content.module.scss';

import { GoogleAutocomplete } from 'components/google-maps/Autocomplete';
import { Label } from 'components/ui-bx/forms';

import {
  newBusinessAddressGeoLocationAtom,
  newBusinessBillingAddressAtom,
  newBusinessBillingAddressCityAtom,
  newBusinessBillingAddressNumberAtom,
  newBusinessGoogleDataAtom,
} from 'atoms/new-business';

function NewBusinessBillingAddress(): JSX.Element {
  const [, setAddressGeoLocation] = useAtom(newBusinessAddressGeoLocationAtom);
  const [, setGoogleAddress] = useAtom(newBusinessBillingAddressAtom);
  const [googleAddress, setGoogleData] = useAtom(newBusinessGoogleDataAtom);
  const [, setAddressNumber] = useAtom(newBusinessBillingAddressNumberAtom);
  const [, setCityName] = useAtom(newBusinessBillingAddressCityAtom);

  const onSelectHandler = useCallback(
    (addressResponse) => {
      if (addressResponse) {
        setGoogleData(addressResponse);
        setAddressGeoLocation(addressResponse.location);
        setGoogleAddress(addressResponse.street);
        setAddressNumber(addressResponse.number);
        setCityName(addressResponse.city);
      }
    },

    [
      setGoogleAddress,
      setAddressGeoLocation,
      setCityName,
      setAddressNumber,
      setGoogleData,
    ]
  );

  return (
    <Col col='12'>
      <Label htmlFor='pyme-email'>
        Dirección <span className={styles.required}>*</span>
      </Label>
      <GoogleAutocomplete
        placeholder='Calle y número, comuna'
        onSelect={onSelectHandler}
        value={googleAddress.address}
      />
    </Col>
  );
}

export default NewBusinessBillingAddress;
