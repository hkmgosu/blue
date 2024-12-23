import style from './step-error.module.scss';
import { useErrorStep2 } from 'emission-lib/hooks/emission-state';
import Modal2 from './modal-2';

export default function NewShippingLayoutErrorStep2(): JSX.Element {
  const [isErrorValid, setIsErrorValid] = useErrorStep2();

  const toggle = (to: boolean): void => setIsErrorValid(to);

  return (
    <div className={style.container}>
      <Modal2 isOpen={isErrorValid} toggle={toggle} />
    </div>
  );
}
