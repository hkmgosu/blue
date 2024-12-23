import styles from './styles.module.scss';

type Props = {
  name: string;
  avatar: string;
  role: string;
};

export default function ManageBusinessCollaborator({
  name,
  avatar,
  role,
}: Props): JSX.Element {
  return (
    <div className={styles.Wrapper}>
      <div className={styles.Avatar}>
        <img src={avatar} alt={name} className={styles.AvatarImage} />
      </div>
      <div className={styles.Content}>
        <div className={styles.Name}>{name}</div>
        <div className={styles.Role}>{role}</div>
      </div>
    </div>
  );
}
