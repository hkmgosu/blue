import { useOpenIsInvalid } from 'emission-lib/hooks/emission-state';
import style from '../error/step-error.module.scss';
import Modal3 from '../error/modal-3';

function NewShippingErrorNext(): JSX.Element {
  const [openIsInvalid, setOpenIsInvalid] = useOpenIsInvalid();

  const toggle = (to: boolean): void => setOpenIsInvalid(to);

  return (
    <div className={style.container}>
      <Modal3 isOpen={openIsInvalid} toggle={toggle} />
    </div>
  );
}

export default NewShippingErrorNext;
