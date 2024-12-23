import { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import cs from 'classnames';

import ButtonContainer from './button-container';
import ButtonIcon from './button-icon';

export type SizeType = 'sm' | 'md' | 'lg' | 'xl';
export type ButtonVariant = 'primary';

export type ButtonProps = {
  to: string;
  size?: SizeType;
  disabled?: boolean;
  variant?: ButtonVariant;
  icon?: ReactElement;
  animationHover?: boolean;
  fullWidth?: boolean;
};

const ButtonLink: FC<ButtonProps> = ({
  to,
  size,
  disabled,
  variant,
  icon,
  children,
  animationHover,
  fullWidth,
}) => {
  return (
    <Link
      to={to}
      className={cs('btn', {
        'btn-primary': variant === 'primary',
        'btn-sm': size === 'sm',
        'btn-md': size === 'md',
        'btn-lg': size === 'lg',
        'btn-xl': size === 'xl',
        'btn-fullwidth': fullWidth,
        'btn-animation': animationHover,
        disabled,
      })}
    >
      {!icon && <ButtonContainer>{children}</ButtonContainer>}
      {icon && (
        <ButtonContainer>
          <ButtonIcon>{icon}</ButtonIcon>
          {children}
        </ButtonContainer>
      )}
    </Link>
  );
};

ButtonLink.defaultProps = {
  animationHover: true,
  size: 'md',
  variant: 'primary',
};

ButtonLink.displayName = 'ButtonLink';

export default ButtonLink;
