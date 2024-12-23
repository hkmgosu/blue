import { FC } from 'react';
import cs from 'classnames';

import successEmoji from './images/success.png';
import dangerEmoji from './images/danger.png';
import infoEmoji from './images/info.png';
import warningEmoji from './images/warning.png';

type Variants = 'success' | 'danger' | 'warning' | 'info';

type AlertProps = {
  variant: Variants;
};

type Emojis = {
  [key in Variants]: string;
};

const emojis: Emojis = {
  success: successEmoji,
  danger: dangerEmoji,
  info: infoEmoji,
  warning: warningEmoji,
};

const Alert: FC<AlertProps> = ({ variant, children }) => {
  return (
    <div
      className={cs('alert', {
        'alert-danger': variant === 'danger',
        'alert-info': variant === 'info',
        'alert-warning': variant === 'warning',
        'alert-success': variant === 'success',
      })}
    >
      <span className='alert-icon'>
        <img src={emojis[variant]} alt={variant} width='21' height='21' />
      </span>
      <span className='alert-text'>{children}</span>
    </div>
  );
};

Alert.displayName = 'Alert';

export default Alert;
