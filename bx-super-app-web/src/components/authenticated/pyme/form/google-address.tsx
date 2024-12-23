import { useCallback, useEffect } from 'react';
import { useAtom } from 'jotai';
import { Col } from '@bx-design/react-grid';

import { GoogleAutocomplete } from 'components/google-maps/Autocomplete';
import { Feedback, Label } from 'components/ui-bx/forms';
import { useYupValidate } from 'hooks/validation/use-yup-validate';
import { pymeAddress } from 'utils/validations/pyme-form';
import { AdapterGeocodingWithInputValueType } from 'components/google-maps/types';
import {
  googleAddressAtom,
  addressGeoLocationAtom,
  googleDataAtom,
  isBillingEditableAtom,
} from 'atoms/pyme-billing-info';
import { usePyme } from 'contexts/pyme/pyme-context';
import styles from '../pyme-billing-info-form.module.scss';

type Props = {
  fromBilling?: boolean;
};

function PymeGoogleAddress({ fromBilling }: Props): JSX.Element {
  const { defaultPyme } = usePyme();
  const [isEditable] = useAtom(isBillingEditableAtom);
  const [googleAddress, setGoogleAddress] = useAtom(googleAddressAtom);
  const [, setAddressGeoLocation] = useAtom(addressGeoLocationAtom);
  const [, setGoogleData] = useAtom(googleDataAtom);
  const { isValid, error } = useYupValidate(pymeAddress, {
    address: googleAddress,
  });
  const editable = fromBilling ? !isEditable : false;

  const onSelectHandler = useCallback(
    (addressResponse: AdapterGeocodingWithInputValueType) => {
      if (addressResponse) {
        setGoogleAddress(addressResponse.address);
        setAddressGeoLocation(addressResponse.location);
        setGoogleData(addressResponse);
      }
    },
    [setGoogleAddress, setAddressGeoLocation, setGoogleData]
  );

  useEffect(() => {
    if (defaultPyme?.has_billing_information) {
      setGoogleAddress(
        `${defaultPyme.billing_information.address} ${defaultPyme.billing_information.address_number}, ${defaultPyme.billing_information.city_name}`
      );
    }
  }, [setGoogleAddress, defaultPyme]);
  return (
    <Col col='12'>
      <Label htmlFor='pyme-email'>
        Dirección <span className={styles.orange}>*</span>
      </Label>
      <GoogleAutocomplete
        placeholder='Ej: Pudeto 2070'
        onSelect={onSelectHandler}
        value={googleAddress}
        disabled={editable}
      />
      {isValid && (
        <Feedback type={'invalid'} isActive>
          {error}
        </Feedback>
      )}
    </Col>
  );
}

export default PymeGoogleAddress;
