import { problemSolutionUrl } from 'config';
import { usePyme } from 'contexts/pyme/pyme-context';
import style from './style.module.scss';

export default function ProblemSolutionView(): JSX.Element {
  const { defaultPyme } = usePyme();
  return (
    <div className={style.container}>
      <iframe
        src={`${problemSolutionUrl}?source=SuperApp&currentAccount=${defaultPyme?.billing_information.current_account}`}
        title='compensation'
        className={style.responsiveIframe}
      ></iframe>
    </div>
  );
}
