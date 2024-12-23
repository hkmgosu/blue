import {
  FC,
  ReactNode,
  InputHTMLAttributes,
  useState,
  useCallback,
  forwardRef,
} from 'react';
import cs from 'classnames';

type InputProps = {
  type?: 'text' | 'email' | 'password' | 'search' | 'number' | 'date' | string;
  error?: boolean;
  form?: string;
  name?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  inputSize?: 'sm' | 'md';
  fill?: string;
  ref?: any;
} & InputHTMLAttributes<HTMLInputElement>;

const InputWithIcon: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type,
      value,
      onChange,
      id,
      readOnly,
      disabled,
      placeholder,
      required,
      form,
      name,
      error,
      fullWidth,
      leftIcon,
      rightIcon,
      inputSize,
      fill,
      ...props
    },
    ref
  ) => {
    const [focused, setFocused] = useState(false);
    const handleFocus = useCallback(() => {
      setFocused(true);
    }, []);

    const handleBlur = useCallback(() => {
      setFocused(false);
    }, []);
    return (
      <div
        className={cs('form-input-container', {
          'form-input-container-disabled': disabled,
          'form-input-invalid': error,
          'form-input-fullwidth': fullWidth,
          'form-input-container-focus': focused,
          'form-input-container-md': inputSize === 'md',
          'form-input-container-sm': inputSize === 'sm',
          'form-input-container-fill': fill,
        })}
      >
        {leftIcon && (
          <div className='form-icon-container form-icon-left'>{leftIcon}</div>
        )}
        <input
          ref={ref}
          className={cs('form-input-with-icon', {
            'form-input-fullwidth': fullWidth,
          })}
          type={type}
          value={value}
          onChange={onChange}
          id={id}
          disabled={disabled}
          readOnly={readOnly}
          placeholder={placeholder}
          required={required}
          form={form}
          name={name}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        {rightIcon && (
          <div className='form-icon-container form-icon-right'>{rightIcon}</div>
        )}
      </div>
    );
  }
);

InputWithIcon.defaultProps = {
  type: 'text',
};

InputWithIcon.displayName = 'InputWithIcon';

export default InputWithIcon;
