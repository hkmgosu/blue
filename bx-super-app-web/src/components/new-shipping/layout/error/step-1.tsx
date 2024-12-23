import style from './step-error.module.scss';
import { useErrorStep1 } from 'emission-lib/hooks/emission-state';
import Modal1 from './modal-1';

export default function NewShippingLayoutErrorStep1(): JSX.Element {
  const [isErrorValid, setIsErrorValid] = useErrorStep1();
  const toggle = (to: boolean): void => setIsErrorValid(to);
  return (
    <div className={style.container}>
      <Modal1 isOpen={isErrorValid} toggle={toggle} />
    </div>
  );
}
