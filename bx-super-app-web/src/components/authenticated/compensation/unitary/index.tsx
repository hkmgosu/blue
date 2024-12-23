import { compensationsUrl } from 'config';
import style from './style.module.scss';

export default function CompensationView(): JSX.Element {
  return (
    <div className={style.container}>
      <iframe
        src={compensationsUrl}
        title='compensation'
        className={style.responsiveIframe}
      ></iframe>
    </div>
  );
}
