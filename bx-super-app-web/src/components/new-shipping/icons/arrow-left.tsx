type Props = {
  color?: string;
  size?: string;
};

function NewShippingIconArrowLeft({ color, size }: Props): JSX.Element {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size || '24'}
      height={size || '24'}
      fill='none'
      viewBox='0 0 24 24'
    >
      <path
        fill={color || 'var(--bx-color-orange)'}
        fillRule='evenodd'
        d='M2.375 12a9.625 9.625 0 1019.25 0 9.625 9.625 0 00-19.25 0zM23 12a11 11 0 11-22 0 11 11 0 0122 0z'
        clipRule='evenodd'
      />
      <path
        fill={color || 'var(--bx-color-orange)'}
        d='M17.3 12.486a.687.687 0 01-.486.201H8.848l2.952 2.951a.69.69 0 01-.223 1.123.689.689 0 01-.75-.15l-4.125-4.124a.687.687 0 010-.974l4.125-4.125a.688.688 0 11.973.974l-2.952 2.95h7.966a.687.687 0 01.486 1.174z'
      />
    </svg>
  );
}

export default NewShippingIconArrowLeft;
