import { Row, Col } from '@bx-design/react-grid';

import { useAuth } from 'contexts/auth-context';
import { useAvatar } from 'contexts/avatar-context';
import styles from './styles.module.scss';
import ManageBusinessRole from '../role';
import ManageBusinessCurrentActions from '../current-actions';
import Collaborators from '../collaborators';

type Props = {
  pymeId: string;
};

export default function ManageBusinessCurrent({ pymeId }: Props): JSX.Element {
  const { user } = useAuth();
  const avatar = useAvatar();
  if (!user) return <></>;
  return (
    <div className={styles.Wrapper}>
      {!pymeId ? (
        <div className={styles.NoPymeSelected}>
          <div className={styles.NoPymeText}>
            Se mostrará información de la empresa seleccionada
          </div>
        </div>
      ) : (
        <>
          <header className={styles.Header}>
            <div className={styles.Avatar}>
              <img
                src={avatar.avatar}
                alt={user.name}
                className={styles.AvatarImage}
              />
            </div>
            <div className={styles.HeaderContent}>
              <div className={styles.HeaderContentUser}>
                <span className={styles.HeaderContentUserName}>
                  {user.name}
                </span>
              </div>
              <ManageBusinessRole pymeId={pymeId} userId={user.sub} />
            </div>
          </header>
          <div className={styles.Content}>
            <Row gX='5'>
              <Col col='12' lg='6'>
                <ManageBusinessCurrentActions
                  pymeId={pymeId}
                  userId={user.sub}
                />
              </Col>
              <Col col='12' lg='6'>
                <Collaborators pymeId={pymeId} />
              </Col>
            </Row>
          </div>
        </>
      )}
    </div>
  );
}
