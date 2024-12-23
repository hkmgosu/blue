import { FC } from 'react';

type IconProps = {
  color?: string;
  size?: string | number;
};

const Weight: FC<IconProps> = ({ color, size }) => {
  return (
    <svg width={size || 24} height={size || 24} fill='none' viewBox='0 0 24 24'>
      <path
        d='M21 3h-1.219A8.943 8.943 0 0121 7.5c0 4.964-4.036 9-9 9s-9-4.036-9-9c0-1.64.45-3.173 1.219-4.5H3C1.345 3 0 4.345 0 6v15c0 1.655 1.345 3 3 3h18c1.655 0 3-1.345 3-3V6c0-1.655-1.345-3-3-3zm-9 12c4.144 0 7.5-3.356 7.5-7.5S16.144 0 12 0a7.498 7.498 0 00-7.5 7.5c0 4.144 3.356 7.5 7.5 7.5zm-.014-7.12l1.575-3.675a.75.75 0 011.378.59L13.36 8.48c.314.332.511.778.511 1.27a1.875 1.875 0 11-3.75 0 1.878 1.878 0 011.866-1.87z'
        fill={color || 'var(--bx-fg)'}
      />
    </svg>
  );
};

export default Weight;
