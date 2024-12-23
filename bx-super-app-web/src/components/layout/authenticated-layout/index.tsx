import { FC } from 'react';
import { useAtom } from 'jotai';
import cs from 'classnames';

import styles from './styles.module.scss';
import Header from '../header';
import Sidebar from '../sidebar';
import NewShippingLayoutNewModal from 'components/new-shipping/layout/new/modal';
import Footer from 'components/layout/footer';
import { menuCollapsed } from 'atoms/dashboard';

const AuthenticatedLayout: FC<{ overflow?: boolean }> = ({
  children,
  overflow,
}) => {
  const [butonState, setIsOpenSidebar] = useAtom(menuCollapsed);

  const toggleSidebar = (): void => {
    setIsOpenSidebar(!butonState);
  };

  return (
    <div className={styles.Container}>
      <Sidebar isOpen={butonState}></Sidebar>
      <div
        className={cs(styles.Content, {
          [styles.ContentIsClosed]: butonState,
          [styles.overflow]: overflow,
        })}
      >
        <Header isExtendedSidebar={butonState} toggleSidebar={toggleSidebar} />
        {children}
        <NewShippingLayoutNewModal />
        <Footer />
      </div>
    </div>
  );
};

export default AuthenticatedLayout;
