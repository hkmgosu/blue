import { FC, useEffect, useState } from 'react';

import { Progress } from 'components/ui-bx/progress';
import ClockImg from 'images/reloj.png';
import styles from './upload-file-section-loading.module.scss';

const LoadingSection: FC<{ title: string }> = ({ title }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 60) {
          return prev + 10;
        } else if (prev >= 60 && prev < 85) {
          return prev + 5;
        } else if (prev >= 90 && prev < 100) {
          return prev + 1;
        }

        return prev;
      });
    }, 800);

    return () => {
      setProgress(100);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={styles.container}>
      <img alt='loading' width='137' height='121' src={ClockImg} />
      <h5 className={styles.title}>{title}</h5>
      <div className={styles.contentProgress}>
        <span>Procesando</span>
        <Progress
          min={0}
          max={100}
          now={progress}
          variant='info'
          animated={true}
        />
      </div>
    </div>
  );
};

export default LoadingSection;
