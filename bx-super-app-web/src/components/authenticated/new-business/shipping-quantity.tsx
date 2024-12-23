import { newBusinessShippingQuantityAtom } from 'atoms/new-business';
import { Select } from 'components/ui-bx/forms';
import { useAtom } from 'jotai';
import { ShippingQuantityType } from 'types/new-business';

import style from './content.module.scss';
import { ShippingQuantity } from './options';

function NewBusinessFormShippingQuantity(): JSX.Element {
  const [, setQuantity] = useAtom(newBusinessShippingQuantityAtom);

  return (
    <>
      <div className={style.indexContainer}>
        <div className={style.dot1}>1</div>
        <div className={style.title}>
          ¿Cuántas encomiendas/pedidos piensas enviar mensualmente?{' '}
          <span className={style.orange}>*</span>
        </div>
      </div>
      <div className={style.selectContainer}>
        <Select
          options={ShippingQuantity}
          onChange={(e) => setQuantity(e.target.value as ShippingQuantityType)}
        />
      </div>
    </>
  );
}

export default NewBusinessFormShippingQuantity;
