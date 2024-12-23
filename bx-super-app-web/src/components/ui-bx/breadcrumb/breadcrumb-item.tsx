import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import cs from 'classnames';

type Props = {
  children: ReactNode;
  active?: boolean;
  href?: string;
  target?: string;
};

export default function BreadcrumbItem({
  active,
  href,
  children,
}: Props): JSX.Element {
  return (
    <li
      className={cs('breadcrumb-item', {
        'breadcrumb-item-is-active': active,
      })}
    >
      {active && children}
      {!active && href && (
        <Link to={href} className='breadcrumb-item-link'>
          {children}
        </Link>
      )}
    </li>
  );
}
