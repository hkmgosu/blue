import { BxEdit } from '@bx-design/react-icons';
import { useHistory } from 'react-router-dom';
import { PymeType } from 'types/auth';

import styles from './styles.module.scss';
type Props = {
  pyme: PymeType;
};
export default function ManageBusinessEdit({ pyme }: Props): JSX.Element {
  const history = useHistory();
  const pyme_id = pyme.id;
  const handleClick = (): void => {
    history.push(`/business-members/${pyme_id}`);
  };
  return (
    <div className={styles.Wrapper} onClick={handleClick}>
      <div className={styles.Text}>Ver tu equipo</div>
      <div className={styles.BoxIcon}>
        <BxEdit />
      </div>
    </div>
  );
}
