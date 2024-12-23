import { newBusinessBusinessOtherShippingContentExplainAtom } from 'atoms/new-business';
import { Input } from 'components/ui-bx/forms';
import { useAtom } from 'jotai';

import style from './content.module.scss';

function NewBusinessFormShippingOtherType(): JSX.Element {
  const [, setContent] = useAtom(
    newBusinessBusinessOtherShippingContentExplainAtom
  );

  return (
    <>
      <div className={style.selectContainer}>
        <Input
          type='text'
          placeholder='Ingrese categoría'
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
    </>
  );
}

export default NewBusinessFormShippingOtherType;
