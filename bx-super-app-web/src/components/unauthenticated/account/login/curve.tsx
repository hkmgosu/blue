import { FC } from 'react';

type Props = {
  width?: string;
  height?: string;
};

const LoginCurve: FC<Props> = ({ width, height }) => {
  return (
    <svg
      width={height ? undefined : width || 420}
      height={width ? undefined : height || 920}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 420 920'
    >
      <path
        d='M263.313 275.35C258.908 141.823 365.935 36.147 420 0H0v920h291.848c29.035-10.161 84.201-65.265 72.587-204.389C349.917 541.706 268.82 442.26 263.313 275.35z'
        fill='#fff'
      />
    </svg>
  );
};

export default LoginCurve;
