import {
  FC,
  LabelHTMLAttributes,
  useState,
  useEffect,
  ChangeEvent,
  useCallback,
} from 'react';
import cs from 'classnames';

type ToggleEventTarget = {
  checked: boolean;
};

type ToggleEvent = {
  target: ToggleEventTarget;
  stopPropagation: () => void;
  preventDefault: () => void;
  nativeEvent: ChangeEvent;
};

type Props = {
  checked?: boolean;
  initialChecked?: boolean;
  onChange?: (event: ToggleEvent) => void;
  disabled?: boolean;
  toggleSize?: 'sm' | 'md' | 'lg';
};

type ToggleProps = Props & LabelHTMLAttributes<HTMLLabelElement>;

const Toggle: FC<ToggleProps> = ({
  initialChecked,
  checked,
  disabled,
  onChange,
  toggleSize,
  ...props
}) => {
  const [selfChecked, setSelfChecked] = useState(initialChecked);

  const changeHandle = useCallback(
    (ev: ChangeEvent) => {
      if (disabled) return;
      const selfEvent: ToggleEvent = {
        target: {
          checked: !selfChecked,
        },
        stopPropagation: ev.stopPropagation,
        preventDefault: ev.preventDefault,
        nativeEvent: ev,
      };

      setSelfChecked(!selfChecked);
      onChange && onChange(selfEvent);
    },
    [disabled, selfChecked, onChange]
  );

  useEffect(() => {
    if (checked === undefined) return;
    setSelfChecked(checked);
  }, [checked]);

  return (
    <label
      className={cs('form-toggle-container', {
        'form-toggle-container-disabled': disabled,
        'form-toggle-container-md': toggleSize === 'md',
        'form-toggle-container-sm': toggleSize === 'sm',
        'form-toggle-container-lg': toggleSize === 'lg',
      })}
      {...props}
    >
      <input
        className='form-toggle-input'
        type='checkbox'
        disabled={disabled}
        checked={selfChecked}
        onChange={changeHandle}
      />
      <div
        className={cs('form-toggle', {
          'form-toggle-is-checked': selfChecked,
        })}
      >
        <span
          className={cs('form-toggle-inner', {
            'form-toggle-inner-is-checked': selfChecked,
          })}
        />
      </div>
    </label>
  );
};

Toggle.displayName = 'Toggle';

Toggle.defaultProps = {
  toggleSize: 'md',
};

export default Toggle;
