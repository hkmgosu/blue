import cs from 'classnames';

import type {
  PaginationProps,
  JustifyContentProps,
  PaginationItemPartial,
} from './types';

const getJustifyContentClasses = (
  props: JustifyContentProps
): Array<string> => [
  props.justifyContent && props.justifyContent !== undefined
    ? 'justify-content-' + props.justifyContent
    : '',
  props.justifyContentSm && props.justifyContentSm !== undefined
    ? 'justify-content-sm-' + props.justifyContentSm
    : '',
  props.justifyContentMd && props.justifyContentMd !== undefined
    ? 'justify-content-md-' + props.justifyContentMd
    : '',
  props.justifyContentLg && props.justifyContentLg !== undefined
    ? 'justify-content-lg-' + props.justifyContentLg
    : '',
  props.justifyContentXl && props.justifyContentXl !== undefined
    ? 'justify-content-xl-' + props.justifyContentXl
    : '',
  props.justifyContentXll && props.justifyContentXll !== undefined
    ? 'justify-content-xll-' + props.justifyContentXll
    : '',
];

const getPaginationClasses = (props: PaginationProps): Array<string> => [
  'pagination',
  props.size === 'lg' ? 'pagination-lg' : '',
  props.size === 'sm' ? 'pagination-sm' : '',
];

export const paginationClasses = (
  paginationProps: PaginationProps,
  justifyContentProps: JustifyContentProps
): string =>
  cs(
    getPaginationClasses(paginationProps),
    getJustifyContentClasses(justifyContentProps)
  );

const getPaginationItemClasses = (
  props: PaginationItemPartial
): Array<string> => [
  'page-item',
  props.disabled ? 'disabled' : '',
  props.active ? 'active' : '',
];

export const paginationItemClasses = (props: PaginationItemPartial): string =>
  cs(getPaginationItemClasses(props));
