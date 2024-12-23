import { useState, ChangeEvent, useEffect } from 'react';
import { useAtom } from 'jotai';
import { Col } from '@bx-design/react-grid';

import { Feedback, Label, Select } from 'components/ui-bx/forms';
import { useYupValidate } from 'hooks/validation/use-yup-validate';
import { pymeCommune } from 'utils/validations/pyme-form';
import { useComunesByIso } from 'hooks/locations/use-communes-by-iso';
import { communeAtom, regionAtom } from 'atoms/pyme-billing-info';

type Props = {
  pymeCommuneMemorized: CommuneSelectedType;
  pymeRegionMemorized: RegionSelectedType;
};

type CommuneSelectedType = {
  code: string;
  name: string;
  region: string;
  base_post: string;
  location_code: string;
};

type RegionSelectedType = {
  name: string;
  region_iso_3166: string;
  country: number;
};

function PymeFormCommune({ pymeCommuneMemorized }: Props): JSX.Element {
  const [region] = useAtom(regionAtom);
  const { communes, refetch } = useComunesByIso(
    region.region_iso_3166,
    'pyme-form-communes'
  );
  useEffect(() => {
    if (region.region_iso_3166) {
      refetch();
    }
  }, [region, region.region_iso_3166, refetch]);
  const [optionsCommunes, setOptionsCommunes] = useState([
    {
      value: '0',
      name: 'Seleccione la comuna',
      code: '',
      region: '',
      base_post: '',
      location_code: '',
    },
  ]);
  const [commune, setCommune] = useAtom(communeAtom);
  const { isValid, error } = useYupValidate(pymeCommune, {
    ...commune,
  });

  useEffect(() => {
    if (communes) {
      let newOptions = communes.map((_commune) => {
        return {
          value: _commune.code,
          name: _commune.name,
          code: _commune.code,
          region: _commune.region,
          base_post: _commune.base_post,
          location_code: _commune.location_code,
        };
      });
      newOptions.unshift({
        value: '0',
        name: 'Seleccione la comuna',
        code: '',
        region: '',
        base_post: '',
        location_code: '',
      });
      if (newOptions) {
        setOptionsCommunes(newOptions);
      }
    }
  }, [communes]);

  useEffect(() => {
    const pymeCommuneData = pymeCommuneMemorized || {
      name: '',
      code: '',
      region: '',
      base_post: '',
      location_code: '',
    };
    if (pymeCommuneData && region.region_iso_3166) {
      setCommune((prev) => ({ ...prev, ...pymeCommuneData }));
    }
  }, [setCommune, pymeCommuneMemorized, region.region_iso_3166]);

  const handleCommuneSelected = (e: ChangeEvent<HTMLSelectElement>): void => {
    if (communes) {
      const data = communes
        .filter((_commune) => _commune.code.toString() === e.target.value)
        .map((_commune) => {
          return {
            name: _commune.name,
            code: _commune.code,
            region: _commune.region,
            base_post: _commune.base_post,
            location_code: _commune.location_code,
          };
        })[0];
      setCommune(data);
    }
  };

  return (
    <Col col='12' md='6'>
      <Label htmlFor='pyme-commune'>Selecciona la comuna*</Label>
      <Select
        value={commune.code}
        name='pyme-commune'
        options={optionsCommunes}
        onChange={handleCommuneSelected}
      />
      {isValid && (
        <Feedback type={'invalid'} isActive>
          {error}
        </Feedback>
      )}
    </Col>
  );
}

export default PymeFormCommune;
