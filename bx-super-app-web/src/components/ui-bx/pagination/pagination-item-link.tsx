import { FC } from 'react';
import { Link } from 'react-router-dom';

import { paginationItemClasses } from './get-classes';
import type { PaginationItemLinkProps } from './types';

const PaginationItemLink: FC<PaginationItemLinkProps> = ({
  to,
  children,
  ...props
}) => {
  return (
    <li className={paginationItemClasses(props)}>
      <Link
        className='page-link'
        to={to}
        aria-disabled={props.disabled || 'false'}
      >
        {children}
      </Link>
    </li>
  );
};

PaginationItemLink.displayName = 'PaginationItemLink';

export default PaginationItemLink;
