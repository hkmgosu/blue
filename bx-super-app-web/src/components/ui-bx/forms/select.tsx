import { FC, SelectHTMLAttributes, useState, useCallback } from 'react';
import cs from 'classnames';

import ChevronDown from './icons/chevron-down';

export type OptionsType = {
  value: string | number;
  name: string;
  disabled?: boolean;
  selected?: boolean;
};

type SelectProps = {
  value?: string | number;
  id?: string;
  disabled?: boolean;
  required?: boolean;
  multiple?: boolean;
  placeholder?: string;
  form?: string;
  name?: string;
  selectSize?: 'sm' | 'md';
  options: Array<OptionsType>;
  fullWidth?: boolean;
} & SelectHTMLAttributes<HTMLSelectElement>;

const Select: FC<SelectProps> = ({
  value,
  onChange,
  id,
  disabled,
  placeholder,
  required,
  form,
  multiple,
  name,
  selectSize,
  options,
  fullWidth,
  ...props
}) => {
  const [focused, setFocused] = useState(false);
  const handleFocus = useCallback(() => {
    setFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setFocused(false);
  }, []);
  return (
    <div
      className={cs('form-select-container', {
        'form-select-container-focus': focused,
        'form-select-container-disabled': disabled,
        'form-select-container-md': selectSize === 'md',
        'form-select-container-sm': selectSize === 'sm',
        'form-select-fullwidth': fullWidth,
      })}
    >
      <select
        className={cs('form-select')}
        value={value}
        onChange={onChange}
        id={id}
        disabled={disabled}
        placeholder={placeholder}
        required={required}
        form={form}
        multiple={multiple}
        name={name}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      >
        {options.map((option) => (
          <option
            value={option.value}
            key={option.value}
            disabled={option.disabled}
            selected={option.selected}
          >
            {option.name}
          </option>
        ))}
      </select>
      <div className='form-select-arrow'>
        <ChevronDown size='16' />
      </div>
    </div>
  );
};

Select.defaultProps = {
  multiple: false,
  selectSize: 'md',
};

export default Select;
