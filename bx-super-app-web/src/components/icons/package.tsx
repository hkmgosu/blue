import { FC } from 'react';

type IconProps = {
  color?: string;
  size?: string | number;
};

const Package: FC<IconProps> = ({ color, size }) => {
  return (
    <svg width={size || 25} height={size || 16} fill='none' viewBox='0 0 25 16'>
      <path
        d='M19.942 6.655c.018-.022.022-.031.04-.054L17.47 1.877a1.432 1.432 0 00-1.357-.986H11.43l1.428 5.764h7.085zm-12.8 0L8.573.891H3.887c-.616 0-1.16.396-1.357.986L.018 6.601c.018.023.022.032.04.054h7.085zm5.715 1.441V11.7a.72.72 0 01-.714.72H7.857a.72.72 0 01-.714-.72V8.096H0v11.528c0 .797.638 1.441 1.429 1.441H18.57c.79 0 1.429-.644 1.429-1.441V8.096h-7.143z'
        fill={color || 'var(--bx-fg)'}
      />
    </svg>
  );
};

export default Package;
