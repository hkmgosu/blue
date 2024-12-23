import { FC, useState, ReactNode, CSSProperties } from 'react';
import cs from 'classnames';
import styles from './tooltip.module.scss';

type TooltipProps = {
  delay?: number;
  direction?: string;
  content: ReactNode;
  children: ReactNode;
  style?: CSSProperties;
};

const Tooltip: FC<TooltipProps> = (props) => {
  const [active, setActive] = useState(false);
  let timeout: NodeJS.Timeout;
  const showTip = (): void => {
    timeout = setTimeout(() => {
      setActive(true);
    }, props.delay || 400);
  };
  const hideTip = (): void => {
    clearInterval(timeout);
    setActive(false);
  };
  return (
    <div onMouseEnter={showTip} onMouseLeave={hideTip}>
      {props.children}

      {active && (
        <div
          className={cs(styles.TooltipTip, {
            [styles.TooltipTipTop]: props.direction === 'top',
            [styles.TooltipTipRight]: props.direction === 'right',
            [styles.TooltipTipLeft]: props.direction === 'left',
            [styles.TooltipTipBottom]: props.direction === 'bottom',
          })}
          style={props.style}
        >
          <div className={styles.content}>{props.content}</div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
