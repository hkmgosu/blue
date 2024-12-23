import { FC, SVGProps } from 'react';

type CheckIconProps = {
  isActive?: boolean;
  indeterminate?: boolean;
} & SVGProps<SVGSVGElement>;

const CheckIcon: FC<CheckIconProps> = ({
  isActive,
  indeterminate,
  ...props
}) => {
  return (
    <svg
      width={16}
      height={16}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      {isActive && !indeterminate && (
        <>
          <path
            d='M0 3a3 3 0 013-3h10a3 3 0 013 3v10a3 3 0 01-3 3H3a3 3 0 01-3-3V3z'
            fill='var(--bx-color-orange)'
          />
          <path
            d='M12.166 5.75l-5.041 5.042L4.833 8.5'
            stroke='var(--bx-color-white)'
            strokeWidth={1.4}
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </>
      )}
      {indeterminate && !isActive && (
        <>
          <path
            d='M0 3a3 3 0 013-3h10a3 3 0 013 3v10a3 3 0 01-3 3H3a3 3 0 01-3-3V3z'
            fill='var(--bx-color-orange)'
          />
          <path
            d='M4 8h8.5'
            stroke='var(--bx-color-white)'
            strokeWidth={1.4}
            strokeLinejoin='round'
          />
        </>
      )}
    </svg>
  );
};

CheckIcon.displayName = 'CheckIcon';

export default CheckIcon;
