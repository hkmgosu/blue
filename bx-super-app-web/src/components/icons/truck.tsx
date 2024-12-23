import { FC } from 'react';

type IconProps = {
  color?: string;
  width?: string | number;
  height?: string | number;
};

const Truck: FC<IconProps> = ({ color, width, height }) => {
  return (
    <svg
      width={width || 27}
      height={height || 21}
      fill='none'
      viewBox='0 0 27 21'
    >
      <g clipPath='url(#prefix__clip0)'>
        <path
          d='M25.247 8.817h-.27l-2.33-4.438a2.116 2.116 0 00-1.877-1.154h-3.415v-1.4C17.355.812 16.566 0 15.603 0H1.753C.78 0 0 .812 0 1.825v14.95c0 1 .78 1.824 1.753 1.824h1.56C3.573 19.964 4.737 21 6.128 21c1.39 0 2.555-1.036 2.815-2.401h9.181C18.384 19.964 19.55 21 20.94 21s2.555-1.036 2.815-2.401h1.526c.95 0 1.719-.8 1.719-1.79v-6.156c0-1.012-.791-1.836-1.753-1.836zm-9.644 7.957H8.729c-.453-1.036-1.448-1.754-2.612-1.754-1.165 0-2.16.718-2.612 1.754H1.741V1.824h13.85v14.95h.012zm5.156-11.736c.147 0 .282.083.35.212l1.877 3.567h-5.63V5.038h3.403zm4.488 11.736h-1.695c-.453-1.036-1.448-1.754-2.612-1.754-1.165 0-2.16.718-2.612 1.754H17.4v-6.133l7.846.012v6.121z'
          fill={color || 'var(--bx-color-black)'}
        />
      </g>
      <defs>
        <clipPath id='prefix__clip0'>
          <path fill={color || 'var(--bx-color-black)'} d='M0 0h27v21H0z' />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Truck;
