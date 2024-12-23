import { FC } from 'react';

type IconProps = {
  color?: string;
  width?: string | number;
  height?: string | number;
};

const SizeHeightIcon: FC<IconProps> = ({ color, width, height }) => {
  return (
    <svg
      width={height ? undefined : width || 8}
      height={height || 12}
      fill='none'
      viewBox='0 0 8 12'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M7.098 6.99l-2.57 2.452v-7.72l2.57 2.451a.54.54 0 00.747 0A.493.493 0 008 3.817a.493.493 0 00-.155-.357L4.373.148A.53.53 0 004 0a.55.55 0 00-.374.148L.155 3.46A.493.493 0 000 3.817c0 .133.056.262.155.356a.541.541 0 00.373.148.54.54 0 00.374-.148l2.57-2.452v7.72L.902 6.99a.53.53 0 00-.374-.147.55.55 0 00-.373.147.503.503 0 00-.155.357.484.484 0 00.155.356l3.471 3.313a.53.53 0 00.374.148.551.551 0 00.373-.148l3.472-3.313A.503.503 0 008 7.346a.484.484 0 00-.155-.357.53.53 0 00-.373-.147.55.55 0 00-.374.147z'
        fill={color || 'var(--bx-color-black)'}
      />
    </svg>
  );
};

export default SizeHeightIcon;
