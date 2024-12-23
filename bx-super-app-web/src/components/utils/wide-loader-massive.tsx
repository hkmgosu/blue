import { FC } from 'react';

import LogoBx from 'components/logo-bx';
import styles from './wide-loader-massive.module.scss';

const WideLoader: FC = () => (
  <div className={styles.container}>
    <div className={styles.loader}>
      <LogoBx width={100} />
    </div>
    <div className={styles.loaderDots}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
);

export default WideLoader;
