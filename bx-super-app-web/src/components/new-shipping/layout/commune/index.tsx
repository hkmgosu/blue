import { useState, useEffect, useCallback } from 'react';
import { SetStateAction } from 'jotai';
import { useComunesByIso } from 'hooks/locations/use-communes-by-iso';
import { Label, Select } from 'components/ui-bx/forms';
import styles from './commune.module.css';
import {
  ShippingCommuneType,
  ShippingGeolocationType,
} from 'emission-lib/types';

type Props = {
  regionIso: string;
  communeCode: string;
  type?: string;
  dispatchCommunes?: (update: SetStateAction<ShippingCommuneType>) => void;
  dispatchCommunesArr?: (update: SetStateAction<ShippingCommuneType>) => void;
  dispatchGeolocation?: (
    update: SetStateAction<ShippingGeolocationType>
  ) => void;
  communeKey?: string;
};

function NewShippingLayoutCommune({
  regionIso,
  communeCode,
  type,
  dispatchCommunes,
  dispatchCommunesArr,
  communeKey,
  dispatchGeolocation,
}: Props): JSX.Element {
  const { communes, refetch } = useComunesByIso(regionIso, communeKey);
  const [optionsCommunes, setOptionCommunes] = useState([
    {
      value: '0',
      name: `Seleccione la comuna de ${type}`,
    },
  ]);

  const cleanCommunes = useCallback(() => {
    setOptionCommunes([
      {
        value: '0',
        name: `Seleccione la comuna de ${type}`,
      },
    ]);
  }, [type]);

  useEffect(() => {
    cleanCommunes();
    refetch();
  }, [regionIso, cleanCommunes, refetch]);

  useEffect(() => {
    if (communes) {
      let newOptions = communes.map((commune) => {
        return {
          value: commune.code,
          name: commune.name,
        };
      });
      newOptions.unshift({
        value: '0',
        name: `Seleccione la comuna de ${type}`,
      });

      setOptionCommunes(newOptions);
      if (dispatchCommunes) {
        dispatchCommunes({
          base_name: '',
          name: `Seleccione la comuna de ${type}`,
          code: 'none',
          base_post: '',
          zone: '',
          location_code: '',
        });
        const selectedCommune = communes.find(
          (commune) => commune.code === communeCode
        );
        if (communeCode && selectedCommune) {
          dispatchCommunes({
            base_name: selectedCommune.base_name,
            name: selectedCommune.name,
            code: selectedCommune.code,
            base_post: selectedCommune.base_post,
            zone: selectedCommune.zone,
            location_code: selectedCommune.location_code,
          });
          if (dispatchGeolocation) {
            dispatchGeolocation({
              latitude: selectedCommune.geolocation.latitude,
              longitude: selectedCommune.geolocation.longitude,
            });
          }
        }
      }
    }
  }, [
    communes,
    type,
    dispatchCommunes,
    regionIso,
    communeCode,
    dispatchGeolocation,
  ]);

  const handleCommunes = useCallback(
    (e) => {
      if (communes) {
        const data = communes
          .filter((commune) => commune.code.toString() === e.target.value)
          .map((commune) => {
            return {
              ...commune,
              geolocation: commune.geolocation || {
                latitude: -33.4334882,
                longitude: -70.797831917,
              },
            };
          })[0];
        if (dispatchCommunes) {
          if (!data) {
            dispatchCommunes({
              base_name: '',
              name: `Seleccione la comuna de ${type}`,
              code: 'none',
              base_post: '',
              zone: '',
              location_code: '',
            });
          } else {
            dispatchCommunes({
              base_name: data.base_name,
              name: data.name,
              code: data.code,
              base_post: data.base_post,
              zone: data.zone,
              location_code: data.location_code,
            });
            if (dispatchGeolocation) {
              dispatchGeolocation({
                latitude: data.geolocation.latitude,
                longitude: data.geolocation.longitude,
              });
            }
          }
        } else if (dispatchCommunesArr) {
          if (!data) {
            dispatchCommunesArr({
              base_name: '',
              name: `Seleccione la comuna de ${type}`,
              code: 'none',
              base_post: '',
              zone: '',
              location_code: '',
            });
          } else {
            dispatchCommunesArr({
              base_name: data.base_name,
              name: data.name,
              code: data.code,
              base_post: data.base_post,
              zone: data.zone,
              location_code: data.location_code,
            });
          }
        }
      }
    },
    [dispatchCommunes, dispatchCommunesArr, communes, type, dispatchGeolocation]
  );

  const changeCommune = communes?.find((comm) => comm.region === regionIso);
  return (
    <>
      <Label htmlFor='destiny-commune'>
        Comuna de {type}
        <span className={styles.required}>*</span>
      </Label>
      <Select
        value={communeCode}
        name='destiny-commune'
        id='destiny-commune'
        options={optionsCommunes}
        onChange={handleCommunes}
        disabled={!changeCommune}
      />
    </>
  );
}

export default NewShippingLayoutCommune;
