import { FC, useCallback, useEffect, useState } from 'react';
import PlacesAutocomplete, {
  geocodeByPlaceId,
} from 'react-places-autocomplete';
import styled from 'styled-components';
import { Row, Col } from '@bx-design/react-grid';

import { adapterGeocodingResponse } from '../util';
import { Input, Label } from 'components/ui-bx/forms';
import { Button } from 'components/ui-bx/button';
import { Modal, ModalBody } from 'components/ui-bx/modal';
import { ShowAlert } from 'components/ui-bx/alert';
import type {
  GoogleGeocodingAdapterType,
  AdapterGeocodingWithInputValueType,
} from '../types';

type PropTypes = {
  placeholder?: string;
  onSelect: (value: AdapterGeocodingWithInputValueType) => void;
  value: string;
  withoutConfirmData?: boolean;
  prevDataProp?: GoogleGeocodingAdapterType | null;
  disabled?: boolean;
};

const GoogleAutocomplete: FC<PropTypes> = ({
  onSelect,
  placeholder,
  value,
  withoutConfirmData,
  prevDataProp,
  disabled,
}) => {
  const [address, setAddress] = useState<string>(value);
  const [prevData, setPrevData] = useState<GoogleGeocodingAdapterType | null>(
    prevDataProp || null
  );
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    if (value) {
      setAddress(value);
    }
  }, [value]);

  const toggleModal = useCallback(() => {
    if (
      showModal &&
      (!prevData?.address ||
        prevData.address === '' ||
        !prevData.number ||
        prevData.number === -1)
    ) {
      setPrevData(null);
      setAddress('');
    }
    setShowModal((prev) => !prev);
  }, [prevData?.address, prevData?.number, showModal]);

  const handleChange = (addrrs: string): void => {
    setAddress(addrrs);
    setPrevData(null);
  };

  const onChangePrevData = <K extends keyof GoogleGeocodingAdapterType>(
    attr: K,
    _value: GoogleGeocodingAdapterType[K]
  ): void => {
    setPrevData((prev) => ({ ...prev!, [attr]: _value }));
  };

  const handleSelect = (addrrs: string, placeId: string): void => {
    geocodeByPlaceId(placeId)
      .then((results) => results[0])
      .then(adapterGeocodingResponse)
      .then((adapter) => {
        if (
          !withoutConfirmData &&
          (!adapter?.number ||
            adapter.number === -1 ||
            !adapter.street ||
            adapter.street === '')
        ) {
          setPrevData(adapter as GoogleGeocodingAdapterType);
          toggleModal();
        } else {
          setAddress(adapter?.address || '');
          onSelect({
            ...(adapter as GoogleGeocodingAdapterType),
            inputAddress: addrrs,
          });
        }
      });
  };

  return (
    <>
      <PlacesAutocomplete
        value={address}
        onChange={handleChange}
        onSelect={handleSelect}
        debounce={1000}
        searchOptions={{
          componentRestrictions: {
            country: 'CL',
          },
        }}
      >
        {({ getInputProps, getSuggestionItemProps, loading, suggestions }) => (
          <AutocompleteContent>
            <Input
              {...getInputProps({
                placeholder: placeholder || 'Buscar dirección...',
                disabled: disabled || false,
              })}
            />
            <AutocompleteItems>
              {loading && <Item>Cargando...</Item>}
              {!loading &&
                suggestions.length > 0 &&
                suggestions.map((suggestion, index) => {
                  const className = suggestion.active ? '--active' : '';

                  return (
                    <Item
                      {...getSuggestionItemProps(suggestion, { className })}
                      key={index}
                    >
                      {suggestion.description}
                    </Item>
                  );
                })}
            </AutocompleteItems>
          </AutocompleteContent>
        )}
      </PlacesAutocomplete>
      <Modal isOpen={showModal} toggle={toggleModal} centered>
        <ModalBody>
          <Row>
            <Col col='12'>
              <ShowAlert variant='danger' isOpen handleClose={() => {}}>
                Por favor completa los datos de calle y número para poder
                identificar tu dirección
              </ShowAlert>
            </Col>
          </Row>
          <Row className='items-center'>
            <Col col='12'>
              <Label htmlFor='route'>
                Nombre de la calle / avenida / pasaje
              </Label>
              <Input
                type='text'
                name='route'
                onChange={(e) => onChangePrevData('street', e.target.value)}
                placeholder='Ingrese dirección'
                value={prevData?.street}
                disabled={disabled}
              />
              <br />
            </Col>
            <Col col='12'>
              <Label htmlFor='street_number'>
                Número de la casa / edificio
              </Label>
              <Input
                type='number'
                disabled={disabled}
                name='street_number'
                onChange={(e) => {
                  const number = Number(e.target.value);

                  if (number < 0) {
                    onChangePrevData('number', number * -1);
                  } else if (number === 0) {
                    onChangePrevData('number', undefined!);
                  } else {
                    onChangePrevData('number', number);
                  }
                }}
                placeholder='Ingrese un número'
                value={prevData?.number === -1 ? undefined : prevData?.number}
              />
            </Col>
          </Row>
          <Row className='justify-end'>
            <Col col='12' lg='6'>
              <br />
              <Button
                fullWidth
                disabled={
                  !prevData?.street ||
                  prevData?.street === '' ||
                  !prevData?.number ||
                  prevData?.number < 0
                }
                onClick={() => {
                  const newAddress = `${prevData?.street} ${prevData?.number}, ${prevData?.city}, ${prevData?.state}, ${prevData?.country}`;
                  setAddress(newAddress);
                  onSelect({
                    ...prevData!,
                    inputAddress: newAddress,
                    address: newAddress,
                  });
                  toggleModal();
                }}
              >
                Guardar
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </>
  );
};

const AutocompleteContent = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
`;

const AutocompleteItems = styled.div`
  position: absolute;
  border: 1px solid var(--bx-color-grey-you);
  border-bottom: none;
  border-top: none;
  z-index: 1;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 5px;
`;

const Item = styled.div`
  padding: 10px;
  cursor: pointer;
  background-color: var(--bx-color-white);
  border: 1px solid var(--bx-color-grey-you);
  &.--active {
    background-color: var(--bx-color-grey-you);
  }
`;

export default GoogleAutocomplete;
