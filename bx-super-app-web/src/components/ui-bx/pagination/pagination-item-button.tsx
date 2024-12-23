import { FC } from 'react';

import { paginationItemClasses } from './get-classes';
import type { PaginationItemButtonProps } from './types';

const PaginationItemButton: FC<PaginationItemButtonProps> = ({
  onClick,
  children,
  ...props
}) => {
  return (
    <li className={paginationItemClasses(props)}>
      <button
        className='page-link'
        onClick={onClick}
        aria-disabled={props.disabled || 'false'}
      >
        {children}
      </button>
    </li>
  );
};

PaginationItemButton.displayName = 'PaginationItemButton';

export default PaginationItemButton;
