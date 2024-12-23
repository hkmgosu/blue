type Props = {
  color?: string;
  size?: string;
};

function NewShippingIconArrowRight({ color, size }: Props): JSX.Element {
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
        d='M2.375 12a9.625 9.625 0 1019.25 0 9.625 9.625 0 00-19.25 0zM23 12a11 11 0 11-22 0 11 11 0 0122 0zm-15.813-.688a.687.687 0 100 1.376h7.966l-2.952 2.95a.687.687 0 10.973.974l4.125-4.125a.688.688 0 000-.974l-4.125-4.125A.69.69 0 0012 7.875a.688.688 0 00.202.487l2.952 2.95H7.187z'
        clipRule='evenodd'
      />
    </svg>
  );
}

export default NewShippingIconArrowRight;
