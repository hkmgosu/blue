import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import cs from 'classnames';

import { usePyme } from 'contexts/pyme/pyme-context';
import ManageBusinessItemList from '../item-list';
import styles from './styles.module.scss';

type Props = {
  pymeSelected: string;
  setPymeSelected: Dispatch<SetStateAction<string>>;
};

export default function ManageBusinessList({
  pymeSelected,
  setPymeSelected,
}: Props): JSX.Element {
  const { pymeList } = usePyme();
  const realPymes = pymeList?.filter((pyme) => pyme.is_natural_person !== true);

  const [translateSlide, setTranslateSlide] = useState(0);
  const [width, setWidth] = useState(0);
  const measuredRef = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      setWidth(node.getBoundingClientRect().width);
    }
  }, []);

  const handleClickDot = useCallback(
    (current: number) => {
      if (width) {
        if (current === 1) {
          setTranslateSlide(0);
        } else {
          setTranslateSlide((width / 2) * -(current - 1));
        }
      }
    },
    [width]
  );

  if (!realPymes) return <></>;

  return (
    <div className={styles.List} ref={measuredRef}>
      <div
        className={styles.ListCarrousel}
        style={{
          width: width * realPymes.length,
          transform: `translate3d(${translateSlide}px, 0px, 0px)`,
        }}
      >
        {realPymes.map((pyme, index) => (
          <div
            key={pyme.id}
            className={cs(styles.ListItem, {
              [styles.ListItemIsActive]: translateSlide === index,
            })}
          >
            <ManageBusinessItemList
              businessName={pyme.social_reason}
              role={'admin'}
              date={pyme.created}
              isActive={pymeSelected === pyme.id}
              onClick={() => setPymeSelected(pyme.id)}
            />
          </div>
        ))}
      </div>
      <div className={styles.Dots}>
        {realPymes.map((pyme, index) => (
          <div
            key={pyme.id}
            className={styles.WrapperDot}
            onClick={() => handleClickDot(index + 1)}
          >
            <div
              className={cs(styles.Dot, {
                [styles.DotIsActive]: translateSlide === index,
              })}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
