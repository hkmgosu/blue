import { FC } from 'react';

import { paginationClasses } from './get-classes';
import type { JustifyContentProps, PaginationProps, Props } from './types';

const Pagination: FC<Props> = ({ ariaLabel, children, ...props }) => {
  const { ...justifyContentProps }: JustifyContentProps = props;
  const { ...paginationProps }: PaginationProps = props;

  return (
    <nav aria-label={ariaLabel}>
      <ul className={paginationClasses(paginationProps, justifyContentProps)}>
        {children}
      </ul>
    </nav>
  );
};

Pagination.displayName = 'Pagination';

export default Pagination;
