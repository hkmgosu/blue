import { FC } from 'react';

type ChevronDownProps = {
  size?: number;
  color?: string;
};

const ChevronRightIcon: FC<ChevronDownProps> = ({ size, color }) => {
  return (
    <svg
      width={size || 24}
      height={size || 24}
      viewBox='0 0 8 14'
      fill='none'
      stroke={color || 'currentColor'}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M1 13L7 7L0.999999 1'
        stroke='var(--bx-color-orange)'
        strokeLinecap='round'
      />
    </svg>
  );
};

export default ChevronRightIcon;
