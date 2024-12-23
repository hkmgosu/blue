import { FC } from 'react';

type IconProps = {
  color?: string;
  width?: string | number;
  height?: string | number;
};

const SizeLongIcon: FC<IconProps> = ({ color, width, height }) => {
  return (
    <svg
      width={height ? undefined : width || 10}
      height={height || 10}
      fill='none'
      viewBox='0 0 10 10'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M3.663 8.769h4.235L1.231 2.102v4.235a.616.616 0 01-1.231 0V.616A.615.615 0 01.616 0h5.721a.616.616 0 110 1.231H2.102L8.77 7.898V3.663a.616.616 0 011.231 0v5.721a.616.616 0 01-.616.616H3.663a.616.616 0 110-1.231z'
        fill={color || 'var(--bx-color-black)'}
      />
    </svg>
  );
};

export default SizeLongIcon;
