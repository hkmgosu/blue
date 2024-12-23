type Props = {
  size?: string;
  color?: string;
};

export default function XIcon({ size, color }: Props): JSX.Element {
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
        d='M14.187 12.003l7.343-7.345a1.55 1.55 0 000-2.2 1.548 1.548 0 00-2.2 0l-7.342 7.345-7.33-7.345a1.548 1.548 0 00-2.2 0 1.55 1.55 0 000 2.2l7.343 7.345-7.343 7.345a1.55 1.55 0 000 2.2c.306.305.697.452 1.1.452.403 0 .794-.147 1.1-.452L12 14.203l7.343 7.345c.305.305.696.452 1.1.452.402 0 .793-.147 1.099-.452a1.55 1.55 0 000-2.2l-7.355-7.345z'
        fill={color || 'currentColor'}
      />
    </svg>
  );
}
