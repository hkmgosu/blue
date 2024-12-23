import { FC, useRef, useState } from 'react';
import { Transition } from 'react-transition-group';
import cs from 'classnames';

export type StatusTypes = 'entering' | 'entered' | 'exiting' | 'exited';

type CollapseProps = {
  children?: React.ReactNode;
  classNames?: string;
  in?: boolean;
};

type FadeClassesType = {
  [key: string]: string;
};

const timeout = 350;

const fadeClasses: FadeClassesType = {
  entering: 'collapsing',
  entered: 'collapse show',
  exiting: 'collapsing',
  exited: 'collapse',
};

const getTransitionClass = (status: StatusTypes): string => {
  return fadeClasses[status];
};

const Collapse: FC<CollapseProps> = ({ classNames, children, ...props }) => {
  const [heightSize, setHeightSize] = useState<{ height: number | undefined }>({
    height: undefined,
  });
  const _collapseRef = useRef<HTMLDivElement>(null);

  const onEntering = (): void => {
    if (_collapseRef.current) {
      setHeightSize({ height: _collapseRef.current.scrollHeight });
    }
  };

  const onEntered = (): void => {
    setHeightSize({ height: undefined });
  };

  const onExit = (): void => {
    if (_collapseRef.current) {
      setHeightSize({ height: _collapseRef.current.scrollHeight });
    }
  };

  const onExiting = (): void => {
    setHeightSize({ height: 0 });
  };

  const onExited = (): void => {
    setHeightSize({ height: undefined });
  };

  const heightRef = _collapseRef.current && _collapseRef.current.scrollHeight;

  return (
    <Transition
      nodeRef={_collapseRef}
      timeout={timeout}
      onEntering={onEntering}
      onEntered={onEntered}
      onExit={onExit}
      onExiting={onExiting}
      onExited={onExited}
      {...props}
    >
      {(status: StatusTypes) => {
        const fadeClassNames = getTransitionClass(status);
        const style = heightSize.height === null ? undefined : heightSize;
        return (
          <div
            style={style}
            className={cs(fadeClassNames, classNames, { heightRef })}
            ref={_collapseRef}
          >
            {children}
          </div>
        );
      }}
    </Transition>
  );
};

Collapse.defaultProps = {
  in: false,
};

Collapse.displayName = 'Collapse';

export default Collapse;
