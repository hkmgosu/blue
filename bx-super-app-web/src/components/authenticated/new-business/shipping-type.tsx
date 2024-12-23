import {
  newBusinessShippingOtherTypeAtom,
  newBusinessShippingTypeAtom,
} from 'atoms/new-business';
import { Select } from 'components/ui-bx/forms';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { ShippingPackageContentType } from 'types/new-business';

import style from './content.module.scss';
import { ShippingType } from './options';

function NewBusinessFormShippingType(): JSX.Element {
  const [type, setType] = useAtom(newBusinessShippingTypeAtom);
  const [, activeInput] = useAtom(newBusinessShippingOtherTypeAtom);

  useEffect(() => {
    if (type === 'OTHER') {
      activeInput(true);
    } else {
      activeInput(false);
    }
  }, [type, activeInput]);

  return (
    <>
      <div className={style.indexContainer}>
        <div className={style.dot2}>2</div>
        <div className={style.title}>
          ¿Qué tipo de productos enviarán con nosotros? Puedes seleccionar más
          de uno
        </div>
      </div>
      <div className={style.selectContainer}>
        <Select
          options={ShippingType}
          onChange={(e) =>
            setType(e.target.value as ShippingPackageContentType)
          }
        />
      </div>
    </>
  );
}

export default NewBusinessFormShippingType;
