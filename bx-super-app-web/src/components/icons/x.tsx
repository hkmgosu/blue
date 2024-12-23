import { FC } from 'react';

type XProps = {
  size?: number;
  color?: string;
};

const XIcon: FC<XProps> = ({ size, color }) => {
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
      <path d='M18 6L6 18M6 6l12 12' />
    </svg>
  );
};

export default XIcon;
