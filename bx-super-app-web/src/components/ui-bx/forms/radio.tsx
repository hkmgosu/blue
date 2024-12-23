import {
  FC,
  ReactNode,
  InputHTMLAttributes,
  useState,
  useEffect,
  useCallback,
  ChangeEvent,
} from 'react';
import cs from 'classnames';

import RadioIcon from './icons/radio-icon';

type RadioEventTarget = {
  checked: boolean;
};

type RadioEvent = {
  target: RadioEventTarget;
  stopPropagation: () => void;
  preventDefault: () => void;
  nativeEvent: ChangeEvent;
};

type Props = {
  label?: string | ReactNode;
  id?: string;
  name?: string;
  initialChecked: boolean;
  onChange?: (e: RadioEvent) => void;
} & InputHTMLAttributes<HTMLInputElement>;

const RadioButton: FC<Props> = ({
  disabled,
  checked,
  label,
  id,
  name,
  initialChecked,
  onChange,
  ...props
}) => {
  const [selfChecked, setSelfChecked] = useState(initialChecked);

  useEffect(() => {
    if (checked === undefined) return;
    setSelfChecked(checked);
  }, [checked]);

  const changeHandle = useCallback(
    (event: ChangeEvent) => {
      if (disabled) return;
      const selfEvent: RadioEvent = {
        target: {
          checked: !selfChecked,
        },
        stopPropagation: event.stopPropagation,
        preventDefault: event.preventDefault,
        nativeEvent: event,
      };
      setSelfChecked(!selfChecked);
      onChange && onChange(selfEvent);
    },
    [disabled, selfChecked, onChange]
  );

  return (
    <label
      className={cs('form-checkbox-container', {
        'form-checkbox-container-disabled': disabled,
      })}
    >
      <div className='form-checkbox-check'>
        <input
          className='form-checkbox'
          type='radio'
          checked={selfChecked}
          disabled={disabled}
          onChange={changeHandle}
          id={id}
          name={name}
          {...props}
        />
        <span>
          <RadioIcon size='16' isActive={selfChecked} />
        </span>
      </div>
      {label && <span className='form-checkbox-label'>{label}</span>}
    </label>
  );
};

RadioButton.defaultProps = {
  initialChecked: false,
};

RadioButton.displayName = 'RadioButton';

export default RadioButton;
