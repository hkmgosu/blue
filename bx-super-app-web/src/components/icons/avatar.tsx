import { FC } from 'react';

const AvatarIcon: FC = () => {
  return (
    <svg
      width='32'
      height='32'
      viewBox='0 0 64 64'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle cx='24' cy='24' r='24' fill='#C4C4C4' />
      <mask
        id='mask0'
        mask-type='alpha'
        maskUnits='userSpaceOnUse'
        x='0'
        y='0'
        width='48'
        height='48'
      >
        <circle cx='24' cy='24' r='24' fill='#C4C4C4' />
      </mask>
      <g mask='url(#mask0)'>
        <path
          d='M24 34C28.9688 34 33 29.9688 33 25C33 20.0312 28.9688 16 24 16C19.0312 16 15 20.0312 15 25C15 29.9688 19.0312 34 24 34ZM32 36H28.5562C27.1687 36.6375 25.625 37 24 37C22.375 37 20.8375 36.6375 19.4438 36H16C11.5813 36 8 39.5812 8 44V45C8 46.6562 9.34375 48 11 48H37C38.6562 48 40 46.6562 40 45V44C40 39.5812 36.4188 36 32 36Z'
          fill='#979797'
        />
      </g>
    </svg>
  );
};

export default AvatarIcon;
