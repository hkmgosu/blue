import { FC } from 'react';

type IconProps = {
  size?: number;
  inverted?: boolean;
  color?: string;
};

const BoxHappyIcon: FC<IconProps> = ({ size, color }) => {
  return (
    <svg width={size || 88} height={size || 80} fill='none' viewBox='0 0 88 80'>
      <path
        d='M82.8685 1.9458H4.93652C3.27967 1.9458 1.93652 3.28895 1.93652 4.9458V75.0542C1.93652 76.7111 3.27967 78.0542 4.93653 78.0542H82.8685C84.5253 78.0542 85.8685 76.7111 85.8685 75.0542V4.9458C85.8685 3.28895 84.5253 1.9458 82.8685 1.9458Z'
        strokeWidth='4'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
        stroke={color || 'var(--bx-color-black)'}
      />
      <path
        d='M58.2046 18.1237L43.8748 12.1195L29.5449 18.1237V1.9458H58.2046V18.1237Z'
        strokeWidth='4'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
        stroke={color || 'var(--bx-color-black)'}
      />
      <path
        d='M29.3789 38.1931C29.3789 40.9172 27.1658 43.0854 24.5101 43.0854C21.799 43.0854 19.6412 40.8616 19.6412 38.1931C19.6412 35.469 21.8543 33.3008 24.5101 33.3008C27.2211 33.3008 29.3789 35.5245 29.3789 38.1931Z'
        fill={color || 'var(--bx-color-black)'}
      />
      <path
        d='M68.1636 38.1931C68.1636 40.9172 65.9505 43.0854 63.2947 43.0854C60.5837 43.0854 58.4259 40.8616 58.4259 38.1931C58.4259 35.469 60.639 33.3008 63.2947 33.3008C65.9505 33.3008 68.1636 35.5245 68.1636 38.1931Z'
        fill={color || 'var(--bx-color-black)'}
      />
      <path
        d='M33.4731 43.1411H54.3869C56.4894 43.1411 58.1492 44.9757 57.8172 46.9771C57.098 51.8138 54.2763 59.4858 43.8194 59.4858C33.8604 59.4858 30.8727 51.8694 29.9875 47.0327C29.6555 44.9757 31.3153 43.1411 33.4731 43.1411Z'
        fill={color || 'var(--bx-color-black)'}
      />
    </svg>
  );
};

export default BoxHappyIcon;
