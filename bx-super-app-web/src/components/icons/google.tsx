import { FC } from 'react';

type IconProps = {
  size?: string | number;
  inverted?: boolean;
};

const GoogleIcon: FC<IconProps> = ({ size, inverted }) => {
  return (
    <svg width={size || 24} height={size || 24} fill='none' viewBox='0 0 24 24'>
      <path
        d='M23 12.28C23 19.128 18.433 24 11.688 24 5.222 24 0 18.639 0 12S5.222 0 11.688 0c3.149 0 5.798 1.185 7.838 3.14l-3.18 3.14C12.182 2.159 4.443 5.256 4.443 12c0 4.186 3.257 7.577 7.244 7.577 4.629 0 6.363-3.406 6.637-5.172h-6.636v-4.128h11.127c.109.615.184 1.205.184 2.004z'
        fill={inverted ? 'var(--bx-bg)' : 'var(--bx-fg)'}
      />
    </svg>
  );
};

export default GoogleIcon;
