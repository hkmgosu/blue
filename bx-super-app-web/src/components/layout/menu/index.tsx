import { FC, ReactNode } from 'react';
import { Link as LinkRouter } from 'react-router-dom';
import {
  BxFileRecord,
  BxHome,
  BxPerson,
  BxQuestion,
  BxStore,
  BxTruck,
} from '@bx-design/react-icons';
import cs from 'classnames';

import styles from './styles.module.scss';
import { useAuth } from 'contexts/auth-context';
import Submenu from '../submenu';
import { useIsNaturalPerson } from 'hooks/pyme/use-is-natural-person';

type MenuType = {
  isCollapsed: boolean;
};

type MenuListType = {
  name: string;
  icon?: ReactNode;
  url?: string;
  role: string;
  children?: Array<{
    name: string;
    url: string;
  }>;
  isOpen: boolean;
  condition: boolean;
};

const Menu: FC<MenuType> = (props) => {
  const { user } = useAuth();
  const { isNaturalPerson } = useIsNaturalPerson();
  const menu: Array<MenuListType> = [
    {
      name: 'Dashboard',
      isOpen: false,
      icon: <BxHome color='var(--bx-color-black)' size={25} />,
      role: '',
      condition: true,
    },
    {
      name: 'Envíos',
      isOpen: false,
      role: 'pyme',
      icon: <BxTruck color='var(--bx-color-black)' size={25} />,
      condition: true,
      children: [
        {
          name: 'Lista de Envíos',
          url: '/shipments/list',
        },
        {
          name: 'Nuevo Envío',
          url: '',
        },
        {
          name: 'Tracking',
          url: '/tracking',
        },
        {
          name: 'Cotizar Envío',
          url: '/price-quote',
        },
        {
          name: 'Problemas con envío',
          url: '/shipping-problems',
        },
        {
          name: 'Seguimiento de casos',
          url: '/saleforce',
        },
        {
          name: 'Ticketera',
          url: '/ticketera',
        },
      ],
    },
    {
      name: 'Empresa',
      isOpen: false,
      role: 'pyme',
      icon: <BxStore color='var(--bx-color-black)' size={25} />,
      url: '',
      condition: !isNaturalPerson,
      children: [
        {
          name: 'Crear Empresa',
          url: '/new-business',
        },
        {
          name: 'Gestionar mi equipo',
          url: '/manage-business',
        },
        {
          name: 'Datos de facturacion',
          url: '/pyme-billing-info-form',
        },
      ],
    },
    {
      name: 'Mi cuenta',
      isOpen: false,
      role: '',
      icon: <BxPerson color='var(--bx-color-black)' size={25} />,
      url: '',
      condition: true,
      children: [
        {
          name: 'Mi Cuenta',
          url: '/account',
        },
        {
          name: 'Mis Solicitudes',
          url: '/account/my-requests',
        },
      ],
    },
    {
      name: 'Centro de ayuda',
      isOpen: false,
      icon: <BxQuestion color='var(--bx-color-black)' size={25} />,
      url: '',
      role: '',
      condition: true,
      children: [
        {
          name: 'Preguntas frecuentes',
          url: '/frequent-question',
        },
        {
          name: 'Tips',
          url: '/tips',
        },
      ],
    },
  ];

  return (
    <div className={styles.MenuContainer}>
      <ul
        className={cs(styles.MenuList, {
          [styles.MenuListIsActive]: props.isCollapsed,
        })}
      >
        {menu.map((menuItem, i) => {
          return (
            (user?.roles.includes(menuItem.role) || menuItem.role === '') &&
            menuItem.condition && (
              <li className={styles.Li} key={i}>
                {menuItem.children ? (
                  <Submenu
                    isCollapsed={props.isCollapsed}
                    name={menuItem.name}
                    children={menuItem.children}
                    icon={menuItem.icon}
                    link={menuItem.url || ''}
                  />
                ) : (
                  <div className='flex cursor-pointer'>
                    <LinkRouter to={menuItem.url || ''}>
                      {menuItem.icon}
                    </LinkRouter>
                    <LinkRouter
                      className={cs(styles.MenuLink, {
                        [styles.MenuLinkIsActive]: props.isCollapsed,
                      })}
                      to={menuItem.url ? menuItem.url : ''}
                    >
                      {menuItem.name}
                    </LinkRouter>
                  </div>
                )}
              </li>
            )
          );
        })}
      </ul>
      <footer className={styles.Footer}>
        <div className={styles.footerContent}>
          {props.isCollapsed && (
            <>
              <BxFileRecord size={20} color='var(--bx-color-black)' />
              <LinkRouter
                className={styles.LinkTerm}
                to={'/terms-and-conditions'}
              >
                Términos y condiciones
              </LinkRouter>
            </>
          )}
        </div>
      </footer>
    </div>
  );
};

export default Menu;
