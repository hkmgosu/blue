import { FC } from 'react';

type IconProps = {
  color?: string;
  size?: string | number;
};

const ArrowsDiagonal: FC<IconProps> = ({ color, size }) => {
  return (
    <svg width={size || 24} height={size || 24} fill='none' viewBox='0 0 24 24'>
      <path
        d='M8.791 21.045h10.164l-16-16v10.164a1.477 1.477 0 11-2.955 0V1.477A1.477 1.477 0 011.478 0h13.73a1.477 1.477 0 110 2.955H5.046l16 16V8.791a1.477 1.477 0 012.955 0v13.731A1.475 1.475 0 0122.523 24H8.79a1.478 1.478 0 010-2.955z'
        fill={color || 'var(--bx-fg)'}
      />
    </svg>
  );
};

export default ArrowsDiagonal;
