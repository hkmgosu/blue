import {
  FC,
  useEffect,
  useRef,
  useState,
  CSSProperties,
  MouseEvent,
} from 'react';
import cs from 'classnames';

import Fade from '../utils/fade';
import successEmoji from './images/success.png';
import dangerEmoji from './images/danger.png';
import infoEmoji from './images/info.png';
import warningEmoji from './images/warning.png';
import XAlertIcon from './icons/x';

type Variants = 'success' | 'danger' | 'warning' | 'info';

type ShowAlertProps = {
  variant: Variants;
  isOpen: boolean;
  handleClose?: () => void;
  handleCloseEvent?: (e: MouseEvent<HTMLElement>) => void;
  fullWidth?: boolean;
  margin?: boolean;
};
type StatusTypes = 'entering' | 'entered' | 'exiting' | 'exited';
type DisplayTransition = CSSProperties;
type TransitionStyles = {
  [key in StatusTypes]: DisplayTransition;
};

const transitionStyles: TransitionStyles = {
  entering: { display: 'flex' },
  entered: { display: 'flex' },
  exiting: { display: 'flex' },
  exited: { display: 'none' },
};

const getTransitionClass = (status: StatusTypes): DisplayTransition => {
  return transitionStyles[status];
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

const ShowAlert: FC<ShowAlertProps> = ({
  isOpen,
  handleClose,
  handleCloseEvent,
  variant,
  children,
  fullWidth,
  margin,
}) => {
  const [alertOpen, setAlertOpen] = useState(isOpen);
  const _alert = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setAlertOpen(true);
    }
    return () => setAlertOpen(false);
  }, [isOpen]);

  return (
    <Fade
      in={alertOpen}
      ref={_alert}
      classNames={cs('alert', {
        'alert-danger': variant === 'danger',
        'alert-info': variant === 'info',
        'alert-warning': variant === 'warning',
        'alert-success': variant === 'success',
        'alert-fullWidth': fullWidth,
        'alert-no-margin': margin,
      })}
      appear
      unmountOnExit
      onStyleTransition={getTransitionClass}
      role='alert'
      aria-hidden={alertOpen.toString()}
    >
      <span className='alert-icon'>
        <img src={emojis[variant]} alt={variant} width='33' height='33' />
      </span>
      <span className='alert-text'>{children}</span>
      {(handleClose || handleCloseEvent) && (
        <button onClick={handleClose || handleCloseEvent} className='alert-btn'>
          <XAlertIcon size='16' />
        </button>
      )}
    </Fade>
  );
};

ShowAlert.displayName = 'ShowAlert';

export default ShowAlert;
