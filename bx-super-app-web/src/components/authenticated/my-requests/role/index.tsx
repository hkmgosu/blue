import { usePyme } from 'contexts/pyme/pyme-context';
import styles from './styles.module.scss';

type Props = {
  pymeId: string;
  userId: string;
};
export default function ManageBusinessRole({
  pymeId,
  userId,
}: Props): JSX.Element {
  const { pymeList } = usePyme();
  const pyme = pymeList?.find((pym) => pym.id === pymeId);
  const role = pyme?.collaborators?.find(
    (coll) => coll.id === userId
  )?.is_admin;
  return (
    <div className={styles.UserRole}>
      {role ? 'Administrador' : 'Integrante'}
    </div>
  );
}
