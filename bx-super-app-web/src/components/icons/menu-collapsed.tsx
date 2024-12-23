import { FC } from 'react';

type IconProps = {
  size?: string | number;
  inverted?: boolean;
};

const MenuCollapsedIcon: FC<IconProps> = () => {
  return (
    <svg
      width='18'
      height='18'
      viewBox='0 0 18 18'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M2 2H16.5'
        stroke='white'
        strokeWidth='3'
        strokeLinecap='round'
      />
      <path d='M2 9H9' stroke='white' strokeWidth='3' strokeLinecap='round' />
      <path
        d='M2 16H16.5'
        stroke='white'
        strokeWidth='3'
        strokeLinecap='round'
      />
    </svg>
  );
};

export default MenuCollapsedIcon;
