import { FC } from 'react';

import styles from './footer.module.scss';

const Footer: FC = () => {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>
        <div className={styles.text}>
          <b>© {year} Blue Express</b> - Todos los derechos reservados
        </div>
        <div className={styles.mobileText}>
          <div>
            <b>© {year} Blue Express</b>
          </div>
          <div>Todos los derechos reservados</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
