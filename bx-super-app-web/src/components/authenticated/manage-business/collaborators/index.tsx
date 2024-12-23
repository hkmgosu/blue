import { BxGroup } from '@bx-design/react-icons';

import { usePyme } from 'contexts/pyme/pyme-context';
import ManageBusinessCollaborator from '../collaborator';
import ManageBusinessEdit from '../edit';
import styles from './styles.module.scss';

type Props = {
  pymeId: string;
};

const avatars: string[] = [
  `${
    process.env.REACT_APP_PUBLIC_IMAGE_URL || ''
  }/images/avatars/avatar-man-1.png`,
  `${
    process.env.REACT_APP_PUBLIC_IMAGE_URL || ''
  }/images/avatars/avatar-naranjo.png`,
  `${
    process.env.REACT_APP_PUBLIC_IMAGE_URL || ''
  }/images/avatars/avatar-girl-1.png`,
  `${
    process.env.REACT_APP_PUBLIC_IMAGE_URL || ''
  }/images/avatars/avatar-girl-2.png`,
  `${
    process.env.REACT_APP_PUBLIC_IMAGE_URL || ''
  }/images/avatars/avatar-girl-3.png`,
];

export default function Collaborators({ pymeId }: Props): JSX.Element {
  const { pymeList } = usePyme();
  if (!pymeList) return <></>;
  const pyme = pymeList.find((pym) => pym.id === pymeId);
  return (
    <div className={styles.Wrapper}>
      <header className={styles.Header}>
        <div className={styles.HeaderContent}>
          <div className={styles.BoxIcon}>
            <BxGroup />
          </div>
          <div className={styles.Title}>Integrantes</div>
        </div>
        {pyme && <ManageBusinessEdit pyme={pyme} />}
      </header>
      <div className={styles.Content}>
        {pyme &&
          pyme.collaborators?.map((collaborator, index) => (
            <ManageBusinessCollaborator
              key={collaborator.email}
              name={`${collaborator.firstName} ${collaborator.lastName}`}
              avatar={avatars[Math.floor(Math.random() * avatars.length)]}
              role={`User 0${index + 1}`}
            />
          ))}
      </div>
    </div>
  );
}
