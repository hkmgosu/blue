import {
  ReactNode,
  useCallback,
  useState,
  Children,
  cloneElement,
  isValidElement,
  ReactElement,
} from 'react';
import cs from 'classnames';

import styles from './buttons-grid-mobile.module.scss';
import NewShippingIconArrowLeft from 'components/new-shipping/icons/arrow-left';
import NewShippingIconArrowRight from 'components/new-shipping/icons/arrow-right';

type Props = {
  children: ReactNode;
};

function PriceQuoteSizesButtonsGridMobile({ children }: Props): JSX.Element {
  const [width, setWidth] = useState(0);
  const [current, setCurrent] = useState(0);
  const [translateSlide, setTranslateSlide] = useState(0);

  const handleClickLeft = useCallback(() => {
    if (current === 0) return;
    if (width) {
      setCurrent(current - 1);
      setTranslateSlide((width / 2) * -(current - 1));
    }
  }, [current, width]);

  const handleClickRight = useCallback(() => {
    if (current === 4) return;
    if (width) {
      setCurrent(current + 1);
      setTranslateSlide((width / 2) * -(current + 1));
    }
  }, [current, width]);

  const modifyChildren = useCallback(
    (child: ReactElement<any>) => {
      if (width) {
        if (width > 0) {
          const newClassName = cs(child.props.className, styles.carouselItem);
          const newStyle = {
            ...child.props.style,
            width: width / 2,
          };
          const props = {
            className: newClassName,
            tabIndex: -1,
            style: newStyle,
          };

          return cloneElement(<div {...props}>{child}</div>);
        }
      }
    },
    [width]
  );

  const measuredRef = useCallback(
    (node: HTMLDivElement) => {
      if (node !== null) {
        setWidth(node.getBoundingClientRect().width);
      }
    },
    [setWidth]
  );

  return (
    <div className={styles.carousel}>
      <div className={styles.wrapper}>
        <div className={cs(styles.buttonWrapper, styles.buttonLeft)}>
          <button
            className={cs(styles.button)}
            tabIndex={-1}
            disabled={current === 0}
            onClick={handleClickLeft}
          >
            <NewShippingIconArrowLeft />
          </button>
        </div>
        <div className={styles.track} role='presentation' ref={measuredRef}>
          <div
            className={styles.trackCarousel}
            style={{
              transform: `translate3d(${translateSlide}px, 0px, 0px)`,
            }}
          >
            <>
              {Children.map(children, (child) =>
                isValidElement(child) ? modifyChildren(child) : child
              )}
            </>
          </div>
        </div>
        <div className={cs(styles.buttonWrapper, styles.buttonRight)}>
          <button
            className={cs(styles.button)}
            tabIndex={-1}
            disabled={current === 4}
            onClick={handleClickRight}
          >
            <NewShippingIconArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default PriceQuoteSizesButtonsGridMobile;
