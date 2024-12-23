import { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { useAtom } from 'jotai';

import { usePyme } from 'contexts/pyme/pyme-context';
import { businessAtom } from 'atoms/price-quote';
import { Label, Select } from 'components/ui-bx/forms';
import styles from './styles.module.scss';

function PriceQouteFormsBusiness(): JSX.Element {
  const { pymeList, defaultPyme } = usePyme();
  const [emitterPymeId, setEmitterPymeId] = useAtom(businessAtom);
  const [optionsCompany, setOptionsCompany] = useState([
    {
      value: '0',
      name: 'Seleccione la empresa que emite',
    },
  ]);

  useEffect(() => {
    if (pymeList && pymeList.length > 1) {
      let newOptions = pymeList.map((pyme) => {
        return {
          value: pyme.id,
          name: pyme.social_reason,
          pyme_id: pyme.id,
        };
      });
      newOptions.unshift({
        value: '0',
        name: 'Seleccione la empresa que emite',
        pyme_id: '',
      });
      if (newOptions) {
        setOptionsCompany(newOptions);
        setEmitterPymeId((prev) => ({
          ...prev,
          pyme_id: defaultPyme?.id || pymeList[0].id,
          pyme_name: defaultPyme?.social_reason || pymeList[0].social_reason,
        }));
      }
    } else if (pymeList && pymeList.length === 1) {
      if (pymeList && pymeList.length === 1) {
        let newOptions = pymeList.map((pyme) => {
          return {
            value: pyme.id,
            name: pyme.social_reason,
            pyme_id: pyme.id,
          };
        });
        if (newOptions) {
          setOptionsCompany(newOptions);
          setEmitterPymeId((prev) => ({
            ...prev,
            pyme_id: defaultPyme?.id || pymeList[0].id,
            pyme_name: defaultPyme?.social_reason || pymeList[0].social_reason,
          }));
        }
      }
    }
  }, [pymeList, setEmitterPymeId, defaultPyme]);

  const handleSelect = useCallback(
    (e: ChangeEvent<HTMLSelectElement>): void => {
      const pymeName = optionsCompany.find(
        (opt) => opt.value === e.target.value
      );
      if (pymeName) {
        setEmitterPymeId({
          pyme_id: e.target.value,
          pyme_name: pymeName.name,
        });
      }
    },
    [optionsCompany, setEmitterPymeId]
  );

  return (
    <>
      <Label htmlFor='business-name'>
        Nombre Empresa<span className={styles.required}>*</span>
      </Label>
      <Select
        value={emitterPymeId.pyme_id}
        name='business-name'
        id='business-name'
        onChange={handleSelect}
        options={optionsCompany}
        disabled={optionsCompany.length === 1}
      />
    </>
  );
}

export default PriceQouteFormsBusiness;
