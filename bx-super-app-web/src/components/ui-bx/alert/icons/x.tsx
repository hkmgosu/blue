import { FC } from 'react';

type Props = {
  color?: string;
  size?: string;
};

const XAlertIcon: FC<Props> = ({ size, color }) => (
  <svg
    stroke='currentColor'
    fill='none'
    viewBox='0 0 24 24'
    width={size || 24}
    height={size || 24}
    color={color}
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M13.75 12.002l5.874-5.876a1.24 1.24 0 000-1.76 1.239 1.239 0 00-1.76 0l-5.874 5.877-5.864-5.876a1.239 1.239 0 00-1.76 0 1.24 1.24 0 000 1.76l5.875 5.875-5.874 5.876A1.24 1.24 0 005.247 20c.322 0 .634-.117.879-.362L12 13.762l5.874 5.876c.245.245.557.362.88.362a1.24 1.24 0 00.88-2.122l-5.885-5.876z'
      fill='currentColor'
    />
  </svg>
);

export default XAlertIcon;
