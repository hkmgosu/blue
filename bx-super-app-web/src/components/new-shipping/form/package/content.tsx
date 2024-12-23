import { useCallback, ChangeEvent, useEffect } from 'react';

import styles from 'components/new-shipping/form/package/styles.module.scss';
import { Input, Label, Feedback } from 'components/ui-bx/forms';
import { useYupValidate } from 'hooks/validation/use-yup-validate';
import { packageContentSchema } from 'utils/validations/new-shipping/basic/package-content.validation';
import { useShippingPackageContent } from 'emission-lib/hooks/shipping-package';
import { useAtom } from 'jotai';
import { shipmentTypeAtom } from 'atoms/shipments/index';

function NewShippingFormPackageContent(): JSX.Element {
  const [packageContent, setPackageContent] = useShippingPackageContent();
  const [typeShipping] = useAtom(shipmentTypeAtom);
  const { isValid, error } = useYupValidate(packageContentSchema, {
    content: packageContent,
  });

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      setPackageContent(e.target.value);
      if (typeShipping === 'unitary') {
        window.localStorage.setItem('content-package', e.target.value);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setPackageContent]
  );
  useEffect(() => {
    if (typeShipping === 'unitary') {
      setPackageContent(
        window.localStorage.getItem('content-package') || packageContent
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Label htmlFor='package-content'>
        Describe brevemente el contenido
        <span className={styles.required}>*</span>
      </Label>
      <Input
        type='text'
        name='package-content'
        id='package-content'
        value={packageContent}
        onChange={handleChange}
        placeholder='Ej: Pelota'
        error={isValid === false}
        maxLength={50}
      />
      {isValid === false && (
        <Feedback type='invalid' isActive={isValid === false}>
          {error}
        </Feedback>
      )}
    </>
  );
}

export default NewShippingFormPackageContent;
