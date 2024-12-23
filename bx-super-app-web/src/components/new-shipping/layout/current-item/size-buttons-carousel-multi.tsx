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

import styles from './size-buttons-carousel-multi.module.scss';
import NewShippingIconArrowLeft from 'components/new-shipping/icons/arrow-left';
import NewShippingIconArrowRight from 'components/new-shipping/icons/arrow-right';
import { useMeasureWidth } from 'emission-lib/hooks/emission-state';

type Props = {
  children: ReactNode;
};

function NewShippingLayoutCurrentItemSizeButtonsCarouselItem({
  children,
}: Props): JSX.Element {
  const [nodeWidth] = useMeasureWidth();
  const [current, setCurrent] = useState(0);
  const [translateSlide, setTranslateSlide] = useState(0);

  const handleClickLeft = useCallback(() => {
    if (current === 0) return;
    if (nodeWidth) {
      setCurrent(current - 1);
      setTranslateSlide((nodeWidth / 2 - 52 - 88) * -(current - 1));
    }
  }, [current, nodeWidth]);

  const handleClickRight = useCallback(() => {
    if (current === 1) return;
    if (nodeWidth) {
      setCurrent(current + 1);
      setTranslateSlide((nodeWidth / 2 - 52 - 88) * -(current + 1));
    }
  }, [current, nodeWidth]);

  const modifyChildren = useCallback(
    (child: ReactElement<any>) => {
      if (nodeWidth > 0) {
        const newClassName = cs(child.props.className, styles.carouselItem);
        const newStyle = {
          ...child.props.style,
          width: (nodeWidth / 2 - 52 - 88) / 3,
        };
        const props = {
          className: newClassName,
          tabIndex: -1,
          style: newStyle,
        };

        return cloneElement(<div {...props}>{child}</div>);
      }
    },
    [nodeWidth]
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
        <div className={styles.track} role='presentation'>
          <div
            className={styles.trackCarousel}
            style={{
              transform: `translate3d(${translateSlide}px, 0px, 0px)`,
            }}
          >
            {nodeWidth > 0 && (
              <>
                {Children.map(children, (child) =>
                  isValidElement(child) ? modifyChildren(child) : child
                )}
              </>
            )}
          </div>
        </div>
        <div className={cs(styles.buttonWrapper, styles.buttonRight)}>
          <button
            className={cs(styles.button)}
            tabIndex={-1}
            disabled={current === 1}
            onClick={handleClickRight}
          >
            <NewShippingIconArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewShippingLayoutCurrentItemSizeButtonsCarouselItem;
