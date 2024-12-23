import { FC } from 'react';

type IconProps = {
  size?: string | number;
  inverted?: boolean;
};

const NoIcon: FC<IconProps> = ({ size }) => {
  return (
    <svg
      width={size ? size : '28'}
      height={size ? size : '30'}
      viewBox='0 0 28 30'
      fill='white'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g filter='url(#filter0_d)'>
        <rect
          x='5'
          y='3'
          width='18'
          height='18'
          rx='1'
          stroke='black'
          strokeLinejoin='round'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M22 20L6 4L22 20Z'
          stroke='black'
          strokeLinecap='round'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M22 4L6 20L22 4Z'
          stroke='black'
          strokeLinecap='round'
        />
      </g>
      <defs>
        <filter
          id='filter0_d'
          x='-2'
          y='0'
          width='32'
          height='32'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
          />
          <feOffset dy='4' />
          <feGaussianBlur stdDeviation='2' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'
          />
          <feBlend
            mode='normal'
            in2='BackgroundImageFix'
            result='effect1_dropShadow'
          />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='effect1_dropShadow'
            result='shape'
          />
        </filter>
      </defs>
    </svg>
  );
};

export default NoIcon;
