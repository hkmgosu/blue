import { FC, ReactElement } from 'react';
import cs from 'classnames';

import { Spinner } from 'components/ui-bx/spinner';
import ButtonContainer from './button-container';
import ButtonIcon from './button-icon';

export type ButtonType = 'button' | 'reset' | 'submit';
export type SizeType = 'sm' | 'md' | 'lg' | 'xl';
export type ButtonVariant = 'primary' | 'outline';

export type ButtonProps = {
  href?: string;
  download?: string;
  target?: string;
  size?: SizeType;
  type?: ButtonType;
  disabled?: boolean;
  isActive?: boolean;
  variant?: ButtonVariant;
  isLoading?: boolean;
  icon?: ReactElement;
  animationHover?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  useLabelWithLoading?: boolean;
};

const Button: FC<ButtonProps> = ({
  size,
  type,
  disabled,
  isActive,
  variant,
  isLoading,
  icon,
  children,
  animationHover,
  fullWidth,
  onClick,
  href,
  target,
  useLabelWithLoading,
  ...props
}) => {
  const Wrapper = href ? 'a' : 'button';
  return (
    <Wrapper
      href={href}
      target={target}
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={cs('btn', {
        'btn-primary': variant === 'primary',
        'btn-outline': variant === 'outline',
        'btn-sm': size === 'sm',
        'btn-md': size === 'md',
        'btn-lg': size === 'lg',
        'btn-xl': size === 'xl',
        'btn-is-loading': isLoading,
        'btn-fullwidth': fullWidth,
        'btn-animation': animationHover,
        'btn-is-active': isActive,
      })}
      {...props}
    >
      {!icon && !isLoading && <ButtonContainer>{children}</ButtonContainer>}
      {icon && !isLoading && (
        <ButtonContainer>
          <ButtonIcon>{icon}</ButtonIcon>
          {children}
        </ButtonContainer>
      )}
      {isLoading && (
        <ButtonContainer>
          <Spinner size={size} /> {useLabelWithLoading && children}
        </ButtonContainer>
      )}
    </Wrapper>
  );
};

Button.defaultProps = {
  animationHover: true,
  size: 'md',
  variant: 'primary',
  isLoading: false,
  useLabelWithLoading: false,
};

Button.displayName = 'Button';

export default Button;
