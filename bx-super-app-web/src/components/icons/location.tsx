import { FC } from 'react';

type LocationProps = {
  size?: number;
  color?: string;
};

const LocationIcon: FC<LocationProps> = ({ size, color }) => {
  return (
    <svg width={size || 36} height={size || 48} fill='none' viewBox='0 0 36 48'>
      <path
        d='M16.15 47.032C2.528 27.284 0 25.258 0 18 0 8.059 8.059 0 18 0s18 8.059 18 18c0 7.258-2.528 9.284-16.15 29.032a2.251 2.251 0 01-3.7 0zM18 25.5a7.5 7.5 0 100-15 7.5 7.5 0 000 15z'
        fill={color || 'var(--bx-color-black)'}
      />
    </svg>
  );
};

export default LocationIcon;
