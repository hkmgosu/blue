import { FC } from 'react';

type Props = {
  size?: string;
  color?: string;
};

const ChevronDown: FC<Props> = ({ size, color }) => {
  return (
    <svg
      width={size || 24}
      height={size || 24}
      color={color || 'currentColor'}
      fill='none'
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M20.73 7.283a.912.912 0 00-1.321 0l-7.259 7.43-7.58-7.44a.9.9 0 00-1.311.03c-.35.388-.35.985.029 1.343l8.23 8.085a.933.933 0 00.651.269c.243 0 .477-.09.661-.279l7.9-8.085a.983.983 0 000-1.353z'
        fill={color || 'currentColor'}
      />
    </svg>
  );
};

export default ChevronDown;
