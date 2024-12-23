import { useState, ChangeEvent, useEffect } from 'react';
import { useAtom } from 'jotai';
import { Col } from '@bx-design/react-grid';

import { Feedback, Label, Select } from 'components/ui-bx/forms';
import { useYupValidate } from 'hooks/validation/use-yup-validate';
import { pymeRegion } from 'utils/validations/pyme-form';
import { useRegions } from 'hooks/locations/use-regions';
import { regionAtom } from 'atoms/pyme-billing-info';

type Props = {
  pymeRegionMemorized: RegionSelectedType;
};

type RegionSelectedType = {
  name: string;
  region_iso_3166: string;
  country: number;
};

function PymeFormRegion({ pymeRegionMemorized }: Props): JSX.Element {
  const { regions } = useRegions('pyme-regions');
  const [optionsRegions, setOptionsRegions] = useState([
    {
      value: '0',
      name: 'Seleccione la región',
      region_iso_3166: '',
      country: 0,
    },
  ]);
  const [region, setRegion] = useAtom(regionAtom);
  const { isValid, error } = useYupValidate(pymeRegion, {
    ...region,
  });

  useEffect(() => {
    const pymeRegionData = pymeRegionMemorized || {
      name: '',
      region_number: '',
      region_iso_3166: '',
      country: 0,
    };
    if (pymeRegionData) {
      setRegion((prev) => ({ ...prev, ...pymeRegionData }));
    }
  }, [setRegion, pymeRegionMemorized]);

  useEffect(() => {
    if (regions) {
      let newOptions = regions.map((_region) => {
        return {
          value: _region.region_iso_3166,
          name: _region.name,
          region_iso_3166: _region.region_iso_3166,
          country: _region.country,
        };
      });
      newOptions.unshift({
        value: '0',
        name: 'Seleccione la región',
        region_iso_3166: '',
        country: 0,
      });
      if (newOptions) {
        setOptionsRegions(newOptions);
      }
    }
  }, [regions]);

  const handleRegionSelected = (e: ChangeEvent<HTMLSelectElement>): void => {
    if (regions) {
      const data = regions
        .filter((_region) => _region.region_iso_3166 === e.target.value)
        .map((_region) => {
          return {
            name: _region.name,
            region_number: _region.region_number,
            region_iso_3166: _region.region_iso_3166,
            country: _region.country,
          };
        })[0];
      setRegion({ ...data });
    }
  };

  return (
    <Col col='12' md='6'>
      <Label htmlFor='pyme-region'>Selecciona la región*</Label>
      <Select
        value={region.region_iso_3166}
        name='pyme-region'
        options={optionsRegions}
        onChange={handleRegionSelected}
      />
      {isValid && (
        <Feedback type={'invalid'} isActive>
          {error}
        </Feedback>
      )}
    </Col>
  );
}

export default PymeFormRegion;
