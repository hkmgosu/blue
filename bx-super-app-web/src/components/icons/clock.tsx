import { FC } from 'react';

type IconProps = {
  color?: string;
  size?: string | number;
};

const ClockIcon: FC<IconProps> = ({ color, size }) => {
  return (
    <svg width={size || 22} height={size || 25} fill='none' viewBox='0 0 22 25'>
      <g fill={color || 'var(--bx-color-black)'}>
        <path d='M13.73 3.23v-1.7h.6c.42 0 .76-.34.76-.76a.76.76 0 00-.75-.77H7.07a.76.76 0 100 1.52h.71V3.2C3.3 4.47 0 8.6 0 13.49c0 5.9 4.8 10.7 10.7 10.7 5.9 0 10.7-4.8 10.7-10.7.01-4.85-3.24-8.95-7.67-10.26zm-4.42-1.7h2.89V2.9a10.592 10.592 0 00-2.89-.02V1.53zm1.39 21.14c-5.06 0-9.18-4.12-9.18-9.18s4.12-9.18 9.18-9.18 9.18 4.12 9.18 9.18-4.12 9.18-9.18 9.18z' />
        <path d='M11.47 13.2V9.14a.76.76 0 10-1.52 0v4.35c0 .19.07.37.2.51l3.58 3.96a.763.763 0 001.08.05c.31-.28.34-.77.05-1.08l-3.39-3.73z' />
      </g>
    </svg>
  );
};

export default ClockIcon;
