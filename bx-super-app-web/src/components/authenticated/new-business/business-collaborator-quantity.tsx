import { newBusinessBusinessColaboratorQuantityAtom } from 'atoms/new-business';
import { Select } from 'components/ui-bx/forms';
import { useAtom } from 'jotai';
import { ColaboratorQuantityType } from 'types/new-business';

import style from './content.module.scss';
import { CollaboratorQuantity } from './options';

function NewBusinessFormBusinessCollaboratorQuantity(): JSX.Element {
  const [, setCollaboratorQuantity] = useAtom(
    newBusinessBusinessColaboratorQuantityAtom
  );

  return (
    <>
      <div className={style.indexContainer}>
        <div className={style.dot3}>3</div>
        <div className={style.title}>
          ¿Cuántos colaboradores tiene tu empresa?
          <span className={style.orange}>*</span>
        </div>
      </div>
      <div className={style.selectContainer}>
        <Select
          options={CollaboratorQuantity}
          onChange={(e) =>
            setCollaboratorQuantity(e.target.value as ColaboratorQuantityType)
          }
        />
      </div>
    </>
  );
}

export default NewBusinessFormBusinessCollaboratorQuantity;
