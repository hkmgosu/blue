import { FC, InputHTMLAttributes } from 'react';
import cs from 'classnames';

type InputProps = {
  type?: 'text' | 'email' | 'password' | 'search' | 'number' | 'tel';
  error?: boolean;
  required?: boolean;
  fullWidth?: boolean;
  inputSize?: 'sm' | 'md';
} & InputHTMLAttributes<HTMLInputElement>;

const Input: FC<InputProps> = ({
  type,
  error,
  disabled,
  required,
  fullWidth,
  inputSize,
  ...props
}) => {
  return (
    <input
      className={cs('form-input', {
        'form-input-invalid': error,
        'form-input-fullwidth': fullWidth,
        'form-input-md': inputSize === 'md',
        'form-input-sm': inputSize === 'sm',
      })}
      type={type}
      disabled={disabled}
      required={required}
      {...props}
    />
  );
};

Input.defaultProps = {
  type: 'text',
};

Input.displayName = 'Input';

export default Input;
