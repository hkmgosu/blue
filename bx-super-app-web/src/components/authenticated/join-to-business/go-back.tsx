import { FC } from 'react';
import { useHistory } from 'react-router-dom';

import styles from 'components/authenticated/join-to-business/go-back.module.scss';

const JoinToBusinessGoBack: FC = () => {
  const history = useHistory();

  const handleClick = (): void => {
    history.push('/dashboard');
  };

  return (
    <div className={styles.wrapper}>
      <span className={styles.link} onClick={handleClick}>
        Volver
      </span>
    </div>
  );
};

export default JoinToBusinessGoBack;
