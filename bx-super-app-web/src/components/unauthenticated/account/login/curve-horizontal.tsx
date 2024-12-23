import { FC } from 'react';

type Props = {
  width?: string;
  height?: string;
};

const LoginCurveHorizontal: FC<Props> = ({ width, height }) => {
  return (
    <svg
      width={height ? undefined : width || 336}
      height={width ? undefined : height || 146}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 336 146'
    >
      <path
        d='M100.563 54.467C51.796 56 13.201 18.794 0 0v146h336V44.548c-3.711-10.093-23.836-29.27-74.646-25.233-63.514 5.047-99.833 33.238-160.791 35.152z'
        fill='#fff'
      />
    </svg>
  );
};

export default LoginCurveHorizontal;
