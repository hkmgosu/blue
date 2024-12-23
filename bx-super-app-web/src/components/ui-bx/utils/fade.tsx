import { forwardRef, CSSProperties } from 'react';
import { Transition } from 'react-transition-group';
import cs from 'classnames';

type FadeProps = {
  tabIndex?: number;
  role?: string;
  children?: React.ReactNode;
  classNames?: string;
  onClick?: (event?: any) => void;
  in?: boolean;
  appear?: boolean;
  mountOnEnter?: boolean;
  unmountOnExit?: boolean;
  onStyleTransition?: (status: StatusTypes) => CSSProperties;
};

export type Ref = HTMLDivElement;

export type StatusTypes = 'entering' | 'entered' | 'exiting' | 'exited';

const timeout = 150;

type FadeClassesType = {
  [key: string]: string;
};

const fadeClasses: FadeClassesType = {
  entered: 'show',
};

const getTransitionClass = (status: StatusTypes): string => {
  return fadeClasses[status];
};

const Fade = forwardRef<Ref, FadeProps>(
  (
    {
      classNames,
      tabIndex,
      role,
      onClick,
      onStyleTransition,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Transition nodeRef={ref} timeout={timeout} {...props}>
        {(status: StatusTypes) => {
          const fadeClassNames = getTransitionClass(status);
          const styles = onStyleTransition && onStyleTransition(status);

          return (
            <div
              className={cs('fade', fadeClassNames, classNames)}
              style={styles}
              tabIndex={tabIndex}
              role={role}
              onClick={onClick}
              ref={ref}
            >
              {children}
            </div>
          );
        }}
      </Transition>
    );
  }
);

Fade.defaultProps = {
  in: false,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: false,
};

Fade.displayName = 'Fade';

export default Fade;
