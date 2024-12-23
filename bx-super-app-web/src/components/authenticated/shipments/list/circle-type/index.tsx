import {
  BxBox,
  BxOrdenCheck,
  BxStore,
  BxTruckGps,
} from '@bx-design/react-icons';

import { useAtom } from 'jotai';
import s from './styles.module.scss';
import cx from 'clsx';
import { macrostateFilterAtom } from 'atoms/macrostate-filter';
const iconsList = {
  IN_PREPARATION: <BxBox size='24' />,
  RETIRED: <BxStore size='24' />,
  IN_TRANSIT: <BxTruckGps size='24' />,
  DELIVERED: <BxOrdenCheck size='24' />,
  WITH_PROBLEMS: <></>,
};
const textList = {
  IN_PREPARATION: 'En Preparación',
  RETIRED: 'Retirado',
  IN_TRANSIT: 'En Tránsito',
  DELIVERED: 'Entregado',
  WITH_PROBLEMS: 'Problema en la Entrega',
};
export type macroStateType =
  | 'IN_PREPARATION'
  | 'RETIRED'
  | 'IN_TRANSIT'
  | 'DELIVERED'
  | 'WITH_PROBLEMS';
type Props = {
  type: macroStateType;
  dataNumber: number;
};
export default function MonitoringPanelContentCircleType({
  type,
  dataNumber,
}: Props): JSX.Element {
  const [activeMacrostate, setMacrostate] = useAtom(macrostateFilterAtom);
  const handleClick = (type: macroStateType): void => {
    if (textList[type] === activeMacrostate) {
      setMacrostate('');
    } else {
      setMacrostate(textList[type]);
    }
  };
  return (
    <div className={s.wrapper}>
      <header
        onClick={() => handleClick(type)}
        className={cx(s.circle, {
          [s.active]: textList[type] === activeMacrostate,
          [s.circlePreparation]: type === 'IN_PREPARATION',
          [s.circleRetired]: type === 'RETIRED',
          [s.circleTransit]: type === 'IN_TRANSIT',
          [s.circleDelivered]: type === 'DELIVERED',
        })}
      >
        <div>{iconsList[type]}</div>
      </header>
      <div className={s.body}>
        <div className={s.bodyText}>{dataNumber}</div>
        <div className={s.bodyFinal}>{textList[type]}</div>
      </div>
    </div>
  );
}
