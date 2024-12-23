import { FC } from 'react';

type IconProps = {
  color?: string;
  width?: string | number;
  height?: string | number;
};

const SizeWidthIcon: FC<IconProps> = ({ color, width, height }) => {
  return (
    <svg
      width={height ? undefined : width || 13}
      height={height || 8}
      fill='none'
      viewBox='0 0 13 8'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M4.86 7.098l-2.855-2.57h8.99L8.14 7.098a.528.528 0 00-.128.171.483.483 0 000 .405.583.583 0 00.318.286.644.644 0 00.64-.115l3.858-3.472a.529.529 0 00.127-.17.483.483 0 000-.405.528.528 0 00-.127-.172L8.97.155A.595.595 0 008.78.04a.644.644 0 00-.64.115.528.528 0 00-.128.171.483.483 0 000 .405c.03.064.073.122.128.17l2.855 2.57h-8.99L4.86.902a.499.499 0 00.172-.373.503.503 0 00-.172-.374A.622.622 0 004.445 0a.622.622 0 00-.415.155L.172 3.626a.528.528 0 00-.127.172.483.483 0 000 .404c.03.064.072.122.127.171L4.03 7.845c.11.1.26.155.415.155a.622.622 0 00.415-.155.503.503 0 00.172-.373.503.503 0 00-.172-.374z'
        fill={color || 'var(--bx-color-black)'}
      />
    </svg>
  );
};

export default SizeWidthIcon;
