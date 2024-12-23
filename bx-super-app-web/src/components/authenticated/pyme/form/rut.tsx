import { useAtom } from 'jotai';
import { Col } from '@bx-design/react-grid';

import { Feedback, Input, Label } from 'components/ui-bx/forms';

import { useYupValidate } from 'hooks/validation/use-yup-validate';
import { pymeRut } from 'utils/validations/pyme-form';
import { isBillingEditableAtom, rutAtom } from 'atoms/pyme-billing-info';
import styles from '../pyme-billing-info-form.module.scss';
import { useEffect } from 'react';
import { usePyme } from 'contexts/pyme/pyme-context';

function PymeFormRut(): JSX.Element {
  const [rut, setRut] = useAtom(rutAtom);
  const [isEditable] = useAtom(isBillingEditableAtom);
  const { isValid, error } = useYupValidate(pymeRut, {
    rut,
  });
  const { defaultPyme } = usePyme();

  useEffect(() => {
    if (defaultPyme) {
      setRut(defaultPyme.billing_information?.rut);
    }
  }, [defaultPyme, setRut]);

  const onChangeRut = (value: string): void => {
    if (!defaultPyme?.billing_information) {
      setRut(value);
    }
  };

  return (
    <Col col='12' md='6'>
      <Label htmlFor='pyme-rut'>
        Rut de la empresa<span className={styles.orange}>*</span>
      </Label>
      <Input
        type='text'
        name='pyme-rut'
        onChange={(e) => onChangeRut(e.target.value)}
        value={rut}
        disabled={defaultPyme?.billing_information ? true : !isEditable}
      />
      {!isValid && (
        <Feedback type={'invalid'} isActive>
          {error}
        </Feedback>
      )}
    </Col>
  );
}

export default PymeFormRut;
