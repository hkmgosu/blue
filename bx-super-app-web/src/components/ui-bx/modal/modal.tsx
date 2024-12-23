import {
  FC,
  useEffect,
  useCallback,
  useRef,
  useState,
  MouseEvent,
  CSSProperties,
} from 'react';
import cs from 'classnames';

import Portal from '../utils/portal';
import Fade from '../utils/fade';
import ModalBackdrop from './modal-backdrop';

type ModalProps = {
  isOpen: boolean;
  toggle: () => void;
  scrollable?: boolean;
  centered?: boolean;
  size?: 'xl' | 'lg' | 'sm';
  backdrop?: boolean | 'static';
  keyboard?: boolean;
  transparent?: boolean;
};
type StatusTypes = 'entering' | 'entered' | 'exiting' | 'exited';
type DisplayTransition = CSSProperties;
type TransitionStyles = {
  [key: string]: DisplayTransition;
};

const Modal: FC<ModalProps> = ({
  isOpen,
  toggle,
  children,
  scrollable,
  centered,
  backdrop = true,
  keyboard = true,
  transparent = false,
  size,
}) => {
  const [modalOpen, setModalOpen] = useState(isOpen);
  const [backdropAnimation, setBackdropAnimation] = useState(false);
  const [isTransparent, setIsTransparent] = useState(false);
  const [backdropAnimationTimeout, setBackdropAnimationTimeout] = useState<
    ReturnType<typeof setTimeout> | undefined
  >();
  const modalRef = useRef<HTMLDivElement | null>(null);
  const _dialog = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (transparent) {
      setIsTransparent(true);
    }
  }, [transparent]);

  useEffect(() => {
    if (isOpen) {
      setModalOpen(true);
    }
    return () => {
      setModalOpen(false);
    };
  }, [isOpen]);

  useEffect(() => {
    if (modalOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [modalOpen]);

  const clearBackdropAnimationTimeout = useCallback(() => {
    if (backdropAnimationTimeout) {
      clearTimeout(backdropAnimationTimeout);
      setBackdropAnimationTimeout(undefined);
    }
  }, [backdropAnimationTimeout]);

  const handleStaticBackdropAnimation = useCallback(() => {
    clearBackdropAnimationTimeout();
    setBackdropAnimation(true);
    setBackdropAnimationTimeout(
      setTimeout(() => {
        setBackdropAnimation(false);
      }, 100)
    );
  }, [clearBackdropAnimationTimeout]);

  const handleBackdropClick = useCallback(
    (evt: MouseEvent<HTMLButtonElement>) => {
      if (evt.target) {
        evt.stopPropagation();

        const _backdrop = _dialog && _dialog.current;
        if (_backdrop && evt.target === _backdrop && backdrop === 'static') {
          handleStaticBackdropAnimation();
        }

        if (!modalOpen || backdrop !== true) return;
        if (backdrop && evt.target === _backdrop && toggle) {
          toggle();
        }
      }
    },
    [modalOpen, backdrop, toggle, handleStaticBackdropAnimation]
  );

  const handleEscape = useCallback(
    (evt) => {
      if (evt.keyCode !== 27) return;
      if (!keyboard) return;
      if (modalOpen && evt.keyCode === 27 && toggle) {
        if (keyboard) {
          evt.preventDefault();
          evt.stopPropagation();
          toggle();
        } else if (backdrop === 'static') {
          evt.preventDefault();
          evt.stopPropagation();
          handleStaticBackdropAnimation();
        }
      }
    },
    [modalOpen, toggle, keyboard, backdrop, handleStaticBackdropAnimation]
  );

  useEffect(() => {
    if (modalOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => document.removeEventListener('keydown', handleEscape);
  }, [modalOpen, handleEscape]);

  const transitionStyles: TransitionStyles = {
    entering: { display: 'block' },
    entered: { display: 'block' },
    exiting: { display: 'block' },
    exited: { display: 'block' },
  };

  const getTransitionClass = (status: StatusTypes): DisplayTransition => {
    return transitionStyles[status];
  };

  return (
    <Portal>
      <Fade
        in={modalOpen}
        ref={_dialog}
        tabIndex={-1}
        aria-hidden={modalOpen.toString()}
        aria-modal={modalOpen.toString()}
        role='dialog'
        onClick={handleBackdropClick}
        classNames={cs('modal', {
          'modal-static': backdropAnimation,
        })}
        appear
        unmountOnExit
        onStyleTransition={getTransitionClass}
      >
        <div
          className={cs('modal-dialog', {
            'modal-dialog-scrollable': scrollable,
            'modal-dialog-centered': centered,
            'modal-xl': size === 'xl',
            'modal-lg': size === 'lg',
            'modal-sm': size === 'sm',
          })}
          ref={modalRef}
        >
          <div
            className={cs({
              'modal-content-transparent': isTransparent,
              'modal-content': !isTransparent,
            })}
          >
            {children}
          </div>
        </div>
      </Fade>
      {backdrop && <ModalBackdrop modalOpen={modalOpen} />}
    </Portal>
  );
};

Modal.displayName = 'Modal';

export default Modal;
