import { BxTrash } from '@bx-design/react-icons';

import { deletePymeCollaborator } from 'api/pyme/roles';
import styles from './styles.module.scss';

type Props = {
  pymeId: string;
  userId: string;
};

export default function ManageBusinessCurrentActionDelete({
  pymeId,
  userId,
}: Props): JSX.Element {
  const handleClick = async (): Promise<void> => {
    try {
      const res = await deletePymeCollaborator(pymeId, userId);
      if (res) {
        window.location.assign(window.location.href);
      }
    } catch (err) {}
  };
  return (
    <div className={styles.Wrapper} onClick={handleClick}>
      <div className={styles.BoxIcon}>
        <BxTrash />
      </div>
      <div className={styles.Text}>Eliminarme del negocio</div>
    </div>
  );
}
