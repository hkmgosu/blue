import { useCallback, ChangeEvent, useEffect } from 'react';

import styles from 'components/new-shipping/form/package/styles.module.scss';
import { Input, Label, Feedback } from 'components/ui-bx/forms';
import { useYupValidate } from 'hooks/validation/use-yup-validate';
import { packageValueSchema } from 'utils/validations/new-shipping/basic/package-value.validation';
import { parseToMoney } from '../../utils/parse-to-money';
import {
  useShippingPackageWarrantyUpdated,
  useShippingPackageWarrantyValue,
} from 'emission-lib/hooks/shipping-package';
import { useAtom } from 'jotai';
import { shipmentTypeAtom } from 'atoms/shipments/index';

function NewShippingFormPackageValue(): JSX.Element {
  const [warrantyValue, setWarrantyValue] = useShippingPackageWarrantyValue();
  const [typeShipping] = useAtom(shipmentTypeAtom);
  const { isValid, error } = useYupValidate(packageValueSchema, {
    package_value: warrantyValue,
  });

  useShippingPackageWarrantyUpdated();

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      const value = e.target.value
        .replace(/[\D]+/, '')
        .replace('$ ', '')
        .replace('.', '');
      if (Number(value) > 8820000) {
        setWarrantyValue(8820000);
      } else {
        setWarrantyValue(Number(value));
        if (typeShipping === 'unitary') {
          window.localStorage.setItem('warranty-value-package', value);
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setWarrantyValue]
  );
  useEffect(() => {
    if (typeShipping === 'unitary') {
      let value = window.localStorage.getItem('warranty-value-package');
      let valueWarranty = Number(value);
      setWarrantyValue(valueWarranty || warrantyValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Label htmlFor='package-value'>
        Valor del contenido
        <span className={styles.required}>*</span>
      </Label>
      <Input
        type='text'
        name='package-value'
        id='package-value'
        value={
          warrantyValue === 0 ? '' : parseToMoney(warrantyValue).toString()
        }
        onChange={(e) => {
          handleChange(e);
        }}
        placeholder='Ej: $100.000'
        error={isValid === false}
        maxLength={20}
      />
      {isValid === false && (
        <Feedback type='invalid' isActive={isValid === false}>
          {error}
        </Feedback>
      )}
    </>
  );
}

export default NewShippingFormPackageValue;
