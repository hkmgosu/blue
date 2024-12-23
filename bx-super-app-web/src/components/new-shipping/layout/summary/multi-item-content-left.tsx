import { ReactNode, useRef, useState } from 'react';
import { Transition } from 'react-transition-group';
import cs from 'classnames';

import styles from './multi-item-content-left.module.scss';

type Props = {
  children: ReactNode;
  summaryButton: boolean;
};

type StatusTypes = 'entering' | 'entered' | 'exiting' | 'exited';

const fadeClasses = {
  entering: styles.contentCollapsing,
  entered: cs(styles.content, styles.show),
  exiting: styles.contentCollapsing,
  exited: cs(styles.content),
};

const getTransitionClass = (status: StatusTypes): string => {
  return fadeClasses[status];
};

function NewShippingLayoutSummaryItemContentLeft({
  children,
  summaryButton,
}: Props): JSX.Element {
  const _nodeRef = useRef<HTMLDivElement | null>(null);
  const [heightSize, setHeightSize] = useState<{ height: number | undefined }>({
    height: undefined,
  });

  const onEntering = (): void => {
    if (_nodeRef.current) {
      setHeightSize({ height: _nodeRef.current.scrollHeight });
    }
  };

  const onEntered = (): void => {
    setHeightSize({ height: undefined });
  };

  const onExit = (): void => {
    if (_nodeRef.current) {
      setHeightSize({ height: _nodeRef.current.scrollHeight });
    }
  };

  const onExiting = (): void => {
    setHeightSize({ height: 0 });
  };

  const onExited = (): void => {
    setHeightSize({ height: undefined });
  };

  const heightRef = _nodeRef.current && _nodeRef.current.scrollHeight;
  return (
    <Transition
      in={summaryButton}
      nodeRef={_nodeRef}
      timeout={350}
      onEntering={onEntering}
      onEntered={onEntered}
      onExit={onExit}
      onExiting={onExiting}
      onExited={onExited}
    >
      {(status: StatusTypes) => {
        const fadeClassNames = getTransitionClass(status);
        const style = heightSize.height === null ? undefined : heightSize;
        return (
          <div
            style={style}
            className={cs(fadeClassNames, { heightRef })}
            ref={_nodeRef}
          >
            {children}
          </div>
        );
      }}
    </Transition>
  );
}

export default NewShippingLayoutSummaryItemContentLeft;
