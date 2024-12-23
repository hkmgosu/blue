import { useCallback, ChangeEvent, useEffect } from 'react';

import styles from 'components/new-shipping/form/package/styles.module.scss';
import { Input, Label, Feedback } from 'components/ui-bx/forms';
import { useYupValidate } from 'hooks/validation/use-yup-validate';
import { packageBillNumberSchema } from 'utils/validations/new-shipping/basic/package-bill-number.validation';
import { useShippingPackageWarrantyBillNumber } from 'emission-lib/hooks/shipping-package';
import { useAtom } from 'jotai';
import { shipmentTypeAtom } from 'atoms/shipments/index';

function NewShippingFormPackageBillNumber(): JSX.Element {
  const [billNumber, setBillingNumber] = useShippingPackageWarrantyBillNumber();
  const [typeShipping] = useAtom(shipmentTypeAtom);
  const { isValid, error } = useYupValidate(packageBillNumberSchema, {
    bill_number: billNumber,
  });

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      setBillingNumber(e.target.value);
      if (typeShipping === 'unitary') {
        window.localStorage.setItem('bill-number-destiny-form', e.target.value);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setBillingNumber]
  );

  useEffect(() => {
    if (typeShipping === 'unitary') {
      const localBillNumber =
        window.localStorage.getItem('bill-number-destiny-form') || billNumber;
      setBillingNumber(localBillNumber);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Label htmlFor='package-bill-number'>
        Nº Boleta/Factura del contenido
        <span className={styles.required}>*</span>
      </Label>
      <Input
        type='text'
        name='package-bill-number'
        id='package-bill-number'
        value={billNumber}
        onChange={handleChange}
        placeholder='Ej: 00087636778'
        error={isValid === false}
        maxLength={20}
      />
      <div className={styles.subtitle}>
        Si el numero de boleta y el valor declarado en este momento no coinciden
        con el documento a enviar en caso de indemnización, esta solicutud será
        rechazada.
      </div>
      {isValid === false && (
        <Feedback type='invalid' isActive={isValid === false}>
          {error}
        </Feedback>
      )}
    </>
  );
}

export default NewShippingFormPackageBillNumber;
