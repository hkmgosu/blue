import { FC } from 'react';

type IconProps = {
  color?: string;
  width?: string | number;
  height?: string | number;
};

const SizeWeightIcon: FC<IconProps> = ({ color, width, height }) => {
  return (
    <svg
      width={height ? undefined : width || 12}
      height={height || 12}
      fill='none'
      viewBox='0 0 12 12'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M10.5 1.395h-.61c.385.617.61 1.33.61 2.093 0 2.31-2.018 4.186-4.5 4.186S1.5 5.797 1.5 3.488c0-.763.225-1.476.61-2.093H1.5c-.827 0-1.5.626-1.5 1.396v6.976c0 .77.673 1.396 1.5 1.396h9c.827 0 1.5-.626 1.5-1.396V2.791c0-.77-.673-1.396-1.5-1.396zM6 6.977c2.072 0 3.75-1.561 3.75-3.489C9.75 1.561 8.072 0 6 0S2.25 1.561 2.25 3.488c0 1.928 1.678 3.489 3.75 3.489zm-.007-3.312l.787-1.71a.384.384 0 01.493-.182c.19.076.279.28.197.457l-.79 1.714a.828.828 0 01.255.59c0 .483-.42.873-.937.873-.518 0-.938-.39-.938-.872.003-.48.42-.868.933-.87z'
        fill={color || 'var(--bx-color-black)'}
      />
    </svg>
  );
};

export default SizeWeightIcon;
