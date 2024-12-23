import { newBusinessShippingWeightAverageAtom } from 'atoms/new-business';
import { Input } from 'components/ui-bx/forms';
import { useAtom } from 'jotai';

import style from './content.module.scss';

function NewBusinessFormShippingWeightAverage(): JSX.Element {
  const [, setAverage] = useAtom(newBusinessShippingWeightAverageAtom);

  return (
    <>
      <div className={style.indexContainer}>
        <div className={style.dot}>3</div>
        <div className={style.title}>
          ¿Cuál es el peso promedio de las encomiendas/pedidos?
        </div>
      </div>
      <div className={style.selectContainer}>
        <Input
          type='text'
          placeholder='Escriba el peso promedio aquí'
          onChange={(e) => setAverage(e.target.value)}
        />
      </div>
    </>
  );
}

export default NewBusinessFormShippingWeightAverage;
