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

import CheckIcon from './icons/check-icon';

type CheckboxEventTarget = {
  checked: boolean;
};

type CheckboxEvent = {
  target: CheckboxEventTarget;
  stopPropagation: () => void;
  preventDefault: () => void;
  nativeEvent: React.ChangeEvent;
};

type CheckboxProps = {
  label?: string | ReactNode;
  id?: string;
  name?: string;
  initialChecked?: boolean;
  indeterminate?: boolean;
  onChange?: (e: CheckboxEvent) => void;
} & InputHTMLAttributes<HTMLInputElement>;

const CheckBox: FC<CheckboxProps> = ({
  disabled,
  checked,
  label,
  id,
  name,
  initialChecked,
  indeterminate,
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
      const selfEvent: CheckboxEvent = {
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
          type='checkbox'
          checked={selfChecked}
          disabled={disabled}
          onChange={changeHandle}
          id={id}
          name={name}
          {...props}
        />
        <span className='form-checkbox-icon'>
          <CheckIcon isActive={selfChecked} indeterminate={indeterminate} />
        </span>
      </div>
      {label && <span className='form-checkbox-label'>{label}</span>}
    </label>
  );
};

CheckBox.defaultProps = {
  initialChecked: false,
};

CheckBox.displayName = 'CheckBox';

export default CheckBox;
