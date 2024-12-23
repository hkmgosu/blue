import { FC } from 'react';

type IconProps = {
  size?: string | number;
  inverted?: boolean;
};

const SearchIcon: FC<IconProps> = () => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M14.4121 14.4121L20 20' stroke='black' strokeLinecap='round' />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M10 16C13.3137 16 16 13.3137 16 10C16 6.68629 13.3137 4 10 4C6.68629 4 4 6.68629 4 10C4 13.3137 6.68629 16 10 16Z'
        stroke='black'
      />
    </svg>
  );
};

export default SearchIcon;
