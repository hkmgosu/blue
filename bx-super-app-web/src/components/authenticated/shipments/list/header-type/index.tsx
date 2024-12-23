import MonitoringPanelContentCircleType from '../circle-type';
import s from './styles.module.scss';
import { ShippingWithEmissionTypeWithStatus } from 'api/emissions/list';

export default function MonitoringPanelContentHeaderType({
  data,
}: {
  data?: ShippingWithEmissionTypeWithStatus['data'];
}): JSX.Element {
  return (
    <div className={s.wrapper}>
      <MonitoringPanelContentCircleType
        type='IN_PREPARATION'
        dataNumber={data?.inPreparing || 0}
      />
      <div className={s.dots}>
        <div className={s.dot} />
      </div>
      <MonitoringPanelContentCircleType
        type='RETIRED'
        dataNumber={data?.retired || 0}
      />
      <div className={s.dots}>
        <div className={s.dot} />
      </div>
      <MonitoringPanelContentCircleType
        type='IN_TRANSIT'
        dataNumber={data?.onWay || 0}
      />
      <div className={s.dots}>
        <div className={s.dot} />
      </div>
      <MonitoringPanelContentCircleType
        type='DELIVERED'
        dataNumber={data?.delivered || 0}
      />
    </div>
  );
}
