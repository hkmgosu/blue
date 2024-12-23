type JustifyContentType =
  | 'start'
  | 'end'
  | 'center'
  | 'between'
  | 'around'
  | 'evenly';

export type JustifyContentProps = {
  justifyContent?: JustifyContentType;
  justifyContentSm?: JustifyContentType;
  justifyContentMd?: JustifyContentType;
  justifyContentLg?: JustifyContentType;
  justifyContentXl?: JustifyContentType;
  justifyContentXll?: JustifyContentType;
};

export type PaginationProps = {
  size?: 'sm' | 'lg';
};

export type Props = { ariaLabel?: string } & PaginationProps &
  JustifyContentProps;

export type PaginationItemPartial = {
  disabled?: boolean;
  active?: boolean;
};
export type PaginationItemButtonProps = {
  onClick: () => void;
} & PaginationItemPartial;

export type PaginationItemLinkProps = {
  to: string;
} & PaginationItemPartial;

export type PaginationItemProps = {
  type: 'button' | 'link';
};
