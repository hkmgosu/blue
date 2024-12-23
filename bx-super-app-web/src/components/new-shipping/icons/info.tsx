type Props = {
  color?: string;
  size?: string;
};

function NewShippingInfo({ color, size }: Props): JSX.Element {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size || '24'}
      height={size || '24'}
      fill='none'
      viewBox='0 0 24 24'
    >
      <g clipPath='url(#clip0)'>
        <path
          fill={color || 'var(--bx-color-orange)'}
          d='M12.13 0C5.44 0 0 5.44 0 12.13C0 18.82 5.44 24.26 12.13 24.26C18.82 24.26 24.26 18.82 24.26 12.13C24.26 5.44 18.82 0 12.13 0ZM12.13 22.73C6.29 22.73 1.53 17.98 1.53 12.13C1.53 6.28 6.28 1.53 12.13 1.53C17.97 1.53 22.73 6.28 22.73 12.13C22.73 17.98 17.98 22.73 12.13 22.73Z'
        />
        <path
          fill={color || 'var(--bx-color-orange)'}
          d='M13.9499 9.25H11.0399L9.57994 15.9C9.57994 15.9 8.88994 18.86 11.0399 19.27C13.5399 19.75 13.9499 17.15 13.9499 17.15C13.9499 17.15 12.3399 17.69 12.4699 16.2C12.5999 14.71 13.9499 9.25 13.9499 9.25Z'
        />
        <path
          fill={color || 'var(--bx-color-orange)'}
          d='M12.96 4.94C12.08 4.94 11.37 5.65 11.37 6.53C11.37 7.41 12.08 8.12 12.96 8.12C13.84 8.12 14.55 7.41 14.55 6.53C14.55 5.65 13.83 4.94 12.96 4.94Z'
        />
      </g>
    </svg>
  );
}

export default NewShippingInfo;
