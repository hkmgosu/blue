import { FC } from 'react';

type ChevronDownProps = {
  size?: number;
  color?: string;
};

const ChevronDownIcon: FC<ChevronDownProps> = ({ size, color }) => {
  return (
    <svg
      width={size || 24}
      height={size || 24}
      viewBox='0 0 24 24'
      fill='none'
      stroke={color || 'currentColor'}
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M6 9l6 6 6-6' />
    </svg>
  );
};

export default ChevronDownIcon;
