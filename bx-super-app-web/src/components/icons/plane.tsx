import { FC } from 'react';

type IconProps = {
  color?: string;
  width?: string | number;
  height?: string | number;
};

const PlaneIcon: FC<IconProps> = ({ color, width, height }) => {
  return (
    <svg
      width={width || 22}
      height={height || 17}
      fill='none'
      viewBox='0 0 22 17'
    >
      <path
        d='M21.86 2.396a1.486 1.486 0 00-1.162-1.222L17.111.385a2.75 2.75 0 00-2.23.483L4.277 8.593l-2.97-.123a1.137 1.137 0 00-.752 2.023l3.056 2.402c.366.446.61.36 6.679-2.946l.568 5.757a.831.831 0 00.85.782.94.94 0 00.61-.25l1.461-1.333a.93.93 0 00.282-.507L15.4 7.126c2.182-1.222 4.247-2.371 5.72-3.208a1.485 1.485 0 00.74-1.522zm-1.345.458c-1.528.868-3.667 2.084-5.965 3.343l-.25.14-1.424 7.743-.898.82-.672-6.906-.813.415c-4.382 2.445-5.843 3.154-6.344 3.374L1.522 9.699l3.104.134 11-7.98a1.534 1.534 0 011.222-.276l3.575.77a.263.263 0 01.214.226.257.257 0 01-.122.281z'
        fill={color || 'var(--bx-fg)'}
      />
    </svg>
  );
};

export default PlaneIcon;
