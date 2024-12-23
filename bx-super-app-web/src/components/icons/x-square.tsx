import { FC } from 'react';

type XSquareProps = {
  size?: number;
  color?: string;
};

const XSquare: FC<XSquareProps> = ({ size, color }) => {
  return (
    <svg width={size || '24'} height={size || '24'} viewBox='0 0 24 24'>
      <path
        d='M5 3h14c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2zm-1.4.6l16.8 16.8m0-16.8L3.6 20.4'
        fill='none'
        stroke={color || 'var(--bx-color-black)'}
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default XSquare;
