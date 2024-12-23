import { FC, useEffect } from 'react';
import cs from 'classnames';

import LogoBx from 'components/logo-bx';
import { BxChevronLeft, BxChevronRight } from '@bx-design/react-icons';
import Menu from './menu';
import { useHistory } from 'react-router-dom';
import { menuCollapsed } from 'atoms/dashboard';
import { useAtom } from 'jotai';
import styles from './sidebar.module.scss';
import useComponentVisible from 'hooks/use-outside-click';

type SidebarType = {
  isOpen: boolean;
};

const Sidebar: FC<SidebarType> = () => {
  const history = useHistory();
  const [collapseMenu, setIsOpenSidebar] = useAtom(menuCollapsed);
  const { ref, isComponentVisible } = useComponentVisible(collapseMenu);

  useEffect(() => {}, [isComponentVisible]);
  return (
    <div
      className={cs(styles.Left, {
        [styles.LeftIsOpen]: collapseMenu,
      })}
      ref={ref}
    >
      <div className='text-center'>
        <div className={styles.LogoContainer}>
          <div
            className='flex justify-center'
            onClick={() => history.push('/dashboard')}
          >
            <LogoBx height={collapseMenu ? 40 : 36}></LogoBx>
          </div>
          <div
            onClick={() => setIsOpenSidebar(!collapseMenu)}
            className={cs(styles.buttonContainer, {
              [styles.active]: collapseMenu === true,
              [styles.hidden]: collapseMenu === false,
            })}
          >
            {collapseMenu ? (
              <BxChevronLeft color='var(--bx-color-white)' size={14} />
            ) : (
              <BxChevronRight size={14} color='var(--bx-color-white)' />
            )}
          </div>
        </div>
      </div>
      <div className={styles.menuContainer}>
        <Menu isCollapsed={collapseMenu} />
      </div>
    </div>
  );
};

export default Sidebar;
