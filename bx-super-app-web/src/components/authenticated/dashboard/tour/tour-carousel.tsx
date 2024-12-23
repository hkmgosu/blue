import {
  Children,
  cloneElement,
  Dispatch,
  FC,
  isValidElement,
  ReactElement,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import cs from 'classnames';
import { BxChevronLeft, BxChevronRight } from '@bx-design/react-icons';

import styles from './tour-carousel.module.scss';

type CarouselProps = {
  width: number;
  handleButtonActive: Dispatch<SetStateAction<number>>;
};

const TourCarouselModal: FC<CarouselProps> = ({
  children,
  width,
  handleButtonActive,
}) => {
  const [current, setCurrent] = useState(0);
  const [translateSlide, setTranslateSlide] = useState(0);

  const handleClickLeft = useCallback(() => {
    if (current === 0) return;

    setCurrent(current - 1);
    setTranslateSlide((width - 24) * -(current - 1));
  }, [current, width]);

  const handleClickRight = useCallback(() => {
    if (current === 3) return;
    setCurrent(current + 1);
    setTranslateSlide((width - 24) * -(current + 1));
  }, [current, width]);

  const handleClickDots = useCallback(
    (mainCurrent: number) => {
      if (current === mainCurrent) return;
      if (Math.sign(translateSlide) === -1) {
        setCurrent(mainCurrent);
        setTranslateSlide((width - 24) * -mainCurrent);
      }
      if (Math.sign(translateSlide) === 0) {
        setCurrent(mainCurrent);
        setTranslateSlide((width - 24) * -mainCurrent);
      }
    },
    [setCurrent, current, setTranslateSlide, width, translateSlide]
  );

  const modifyChildren = useCallback(
    (child: ReactElement<any>) => {
      const newClassName = cs(child.props.className, styles.carouselItem);
      const newStyle = {
        ...child.props.style,
        width: width - 24,
      };
      const props = {
        className: newClassName,
        tabIndex: -1,
        style: newStyle,
      };

      return cloneElement(child, props);
    },
    [width]
  );

  useEffect(() => {
    if (current === 3) {
      handleButtonActive(3);
    }
    if (current === 2) {
      handleButtonActive(2);
    }
    if (current === 1) {
      handleButtonActive(1);
    }
    if (current === 0) {
      handleButtonActive(0);
    }
  }, [handleButtonActive, current]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.carousel}>
        <div className={styles.track}>
          <div
            className={styles.carouselTrack}
            role='presentation'
            style={{
              transform: `translate3d(${translateSlide}px, 0px, 0px)`,
            }}
          >
            {width > 0 && (
              <>
                {Children.map(children, (child) =>
                  isValidElement(child) ? modifyChildren(child) : child
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <div className={styles.buttonsContainer}>
        {current === 0 ? (
          <div className={styles.hide}>Atrás</div>
        ) : (
          <button className={styles.button} onClick={handleClickLeft}>
            <span className={styles.iconContainerLeft}>
              <BxChevronLeft size={10} color='#2BB9FF' />
            </span>
            <span className={styles.textContainer}>Atrás</span>
          </button>
        )}

        <div className={styles.buttonSteps}>
          <button
            className={cs(styles.dot, {
              [styles.dotIsActive]: current === 0,
            })}
            onClick={() => handleClickDots(0)}
          />
          <button
            className={cs(styles.dot, {
              [styles.dotIsActive]: current === 1,
            })}
            onClick={() => handleClickDots(1)}
          />
          <button
            className={cs(styles.dot, {
              [styles.dotIsActive]: current === 2,
            })}
            onClick={() => handleClickDots(2)}
          />
        </div>

        {current === 2 ? (
          <div className={styles.hide}>* Continuar </div>
        ) : (
          <button className={styles.button} onClick={handleClickRight}>
            <span className={styles.textContainer}>Continuar</span>
            <span className={styles.iconContainerRight}>
              <BxChevronRight size={10} color='#2BB9FF' />
            </span>
          </button>
        )}
      </div>
      <div className={styles.counter}>{current + 1}/3</div>
    </div>
  );
};

export default TourCarouselModal;
