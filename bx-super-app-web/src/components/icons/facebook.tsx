import { FC } from 'react';

type IconProps = {
  width?: number;
  height?: number;
  inverted?: boolean;
};

const FacebookIcon: FC<IconProps> = ({ height, width, inverted = false }) => {
  return (
    <svg
      width={height ? undefined : width || 24}
      height={height || 24}
      viewBox='0 0 24 24'
    >
      <path
        d='M3.486 24V13.266H0V9h3.486V5.64C3.486 1.987 5.65 0 8.81 0c1.514 0 2.814.117 3.191.169v3.815H9.81c-1.72 0-2.05.844-2.05 2.077V9h3.876l-.531 4.266H7.758V24'
        fill={inverted ? 'var(--bx-bg)' : 'var(--bx-fg)'}
      />
    </svg>
  );
};

export default FacebookIcon;
