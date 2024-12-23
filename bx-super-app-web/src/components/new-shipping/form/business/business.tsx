import { useState, useEffect, useCallback, ChangeEvent } from 'react';

import styles from 'components/new-shipping/form/business/styles.module.css';
import { usePyme } from 'contexts/pyme/pyme-context';
import { Label, Select } from 'components/ui-bx/forms';
import {
  useEmitterPymeId,
  useEmitterPymeName,
} from 'emission-lib/hooks/emitter';
import { useIsNaturalPerson } from 'hooks/pyme/use-is-natural-person';

function NewShippingFormBusiness(): JSX.Element {
  const { pymeList, defaultPyme } = usePyme();

  const { isNaturalPerson, naturalPerson } = useIsNaturalPerson();
  const [emitterPymeId, setEmitterPymeId] = useEmitterPymeId();
  const [, setEmitterPymeName] = useEmitterPymeName();
  const [optionsCompany, setOptionsCompany] = useState([
    {
      value: '0',
      name: 'Seleccione la empresa que emite',
    },
  ]);

  useEffect(() => {
    if (pymeList && pymeList.length > 1) {
      if (isNaturalPerson && naturalPerson) {
        setOptionsCompany([
          {
            value: naturalPerson.id,
            name: naturalPerson.social_reason,
          },
        ]);
        setEmitterPymeId(naturalPerson?.id || naturalPerson.id);
        setEmitterPymeName(
          naturalPerson?.social_reason || naturalPerson.social_reason
        );
      } else {
        let newOptions = pymeList
          .map((pyme) => {
            return {
              value: pyme.id,
              name: pyme.social_reason,
              pyme_id: pyme.id,
              is_natural_person: pyme.is_natural_person,
            };
          })
          .filter((p) => p.is_natural_person === false);
        newOptions.unshift({
          value: '0',
          name: 'Seleccione la empresa que emite',
          pyme_id: '',
          is_natural_person: false,
        });

        if (newOptions) {
          setOptionsCompany(newOptions);
          setEmitterPymeId(defaultPyme?.id || pymeList[0].id);
          setEmitterPymeName(
            defaultPyme?.social_reason || pymeList[0].social_reason
          );
        }
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
          setEmitterPymeId(defaultPyme?.id || pymeList[0].id);
          setEmitterPymeName(
            defaultPyme?.social_reason || pymeList[0].social_reason
          );
        }
      }
    }
  }, [
    pymeList,
    setEmitterPymeId,
    defaultPyme,
    setEmitterPymeName,
    isNaturalPerson,
    naturalPerson,
  ]);

  const handleSelect = useCallback(
    (e: ChangeEvent<HTMLSelectElement>): void => {
      const pymeName = optionsCompany.find(
        (opt) => opt.value === e.target.value
      );
      if (pymeName) {
        setEmitterPymeId(e.target.value);
        setEmitterPymeName(pymeName.name);
      }
    },
    [optionsCompany, setEmitterPymeId, setEmitterPymeName]
  );

  return (
    <>
      <Label htmlFor='business-name'>
        {isNaturalPerson ? (
          'Nombre'
        ) : (
          <>
            Empresa que envía <span className={styles.required}>*</span>
          </>
        )}
      </Label>
      <Select
        value={emitterPymeId}
        name='business-name'
        id='business-name'
        onChange={handleSelect}
        options={optionsCompany}
        disabled={optionsCompany.length === 1}
      />
    </>
  );
}

export default NewShippingFormBusiness;
