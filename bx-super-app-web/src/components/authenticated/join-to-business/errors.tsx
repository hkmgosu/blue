import { FC } from 'react';
import { useAtom } from 'jotai';

import {
  joinToBusinessIsErrorAtom,
  joinToBusinessErrorAtom,
} from 'atoms/join-to-business';
import { ShowAlert } from 'components/ui-bx/alert';
import styles from './errors.module.scss';

const JoinToBusinessErrors: FC = () => {
  const [isError, setIsError] = useAtom(joinToBusinessIsErrorAtom);
  const [error] = useAtom(joinToBusinessErrorAtom);
  return (
    <div className={styles.wrapper}>
      <ShowAlert
        variant='danger'
        isOpen={isError}
        handleClose={() => setIsError(false)}
      >
        <div className={styles.errorText}>{error}</div>
      </ShowAlert>
    </div>
  );
};

export default JoinToBusinessErrors;
