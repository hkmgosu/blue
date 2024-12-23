import { FC, useState, useCallback, TextareaHTMLAttributes } from 'react';
import cs from 'classnames';

type Props = {
  id?: string;
  error?: boolean;
  disabled?: boolean;
};

type TextareaProps = Props & TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea: FC<TextareaProps> = ({
  value,
  onChange,
  id,
  error,
  disabled,
  placeholder,
  form,
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
      className={cs('form-textarea-container', {
        'form-textarea-container-disabled': disabled,
        'form-textarea-container-error': error,
        'form-textarea-container-focus': focused,
      })}
    >
      <textarea
        className='form-textarea'
        value={value}
        onChange={onChange}
        id={id}
        disabled={disabled}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        form={form}
        {...props}
      />
    </div>
  );
};

Textarea.displayName = 'Textarea';

export default Textarea;
