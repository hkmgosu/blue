import { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { SetStateAction } from 'jotai';

import { Label, Select } from 'components/ui-bx/forms';
import { useRegions } from 'hooks/locations/use-regions';
import styles from './region.module.css';
import { ShippingRegionType } from 'emission-lib/types';

type Props = {
  type?: string;
  dispatchCommunes?: (update: SetStateAction<ShippingRegionType>) => void;
  dispatchCommunesArr?: (update: SetStateAction<ShippingRegionType>) => void;
  regionIso: string;
  regionKey?: string;
};

function NewShippingFormRegion({
  dispatchCommunes,
  dispatchCommunesArr,
  regionIso,
  type,
  regionKey,
}: Props): JSX.Element {
  const { regions } = useRegions(regionKey);
  const [optionsRegions, setOptionsRegions] = useState([
    {
      value: '0',
      name: `Seleccione la región de ${type}`,
    },
  ]);

  useEffect(() => {
    if (regions) {
      let newOptions = regions.map((region) => {
        return {
          value: region.region_iso_3166,
          name: region.name,
        };
      });
      newOptions.unshift({
        value: '0',
        name: `Seleccione la región de ${type}`,
      });
      if (newOptions) {
        setOptionsRegions(newOptions);
      }
    }
  }, [regions, type]);

  const handleRegions = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      if (regions) {
        const data = regions
          .filter((region) => region.region_iso_3166 === e.target.value)
          .map((region) => {
            return {
              name: region.name,
              region_number: region.region_number,
              region_iso_3166: region.region_iso_3166,
              country: region.country,
            };
          })[0];

        if (dispatchCommunes) {
          if (!data) {
            dispatchCommunes({
              name: `Seleccione la región de ${type}`,
              region_number: '',
              region_iso_3166: '0',
              country: 0,
            });
          } else {
            dispatchCommunes({ ...data });
          }
        } else if (dispatchCommunesArr) {
          if (!data) {
            dispatchCommunesArr({
              name: `Seleccione la región de ${type}`,
              region_number: '',
              region_iso_3166: '0',
              country: 0,
            });
          } else {
            dispatchCommunesArr({ ...data });
          }
        }
      }
    },
    [dispatchCommunes, dispatchCommunesArr, regions, type]
  );

  return (
    <>
      <Label htmlFor='destiny-region'>
        Región de {type}
        <span className={styles.required}>*</span>
      </Label>
      <Select
        value={regionIso}
        name='destiny-region'
        id='destiny-region'
        options={optionsRegions}
        onChange={handleRegions}
      />
    </>
  );
}

export default NewShippingFormRegion;
