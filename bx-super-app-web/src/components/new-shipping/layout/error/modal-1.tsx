import { Row, Col } from '@bx-design/react-grid';
import { Modal, ModalBody, ModalClose } from 'components/ui-bx/modal';
import { useEmitterValidate } from 'emission-lib/hooks/emitter';
import alertImg from 'images/globoalert.png';
import { useMemo } from 'react';
import s from './modal-styles.module.scss';

type Props = {
  isOpen: boolean;
  toggle: (to: boolean) => void;
};

export default function Modal2({ isOpen, toggle }: Props): JSX.Element {
  const { errors } = useEmitterValidate();
  const newErrors = useMemo(
    () => [...new Map(errors?.map((err) => [err.message, err])).values()],
    [errors]
  );

  return (
    <Modal isOpen={isOpen} toggle={() => toggle(false)} centered>
      <ModalClose closeButton={() => toggle(false)}></ModalClose>
      <ModalBody>
        <Row>
          <Col col='12' className='mb-4'>
            <div className={s.BoxImage}>
              <img src={alertImg} alt='Alerta' className={s.Img} />
            </div>
          </Col>
          <Col col='12'>
            <p className={s.Title}>
              Los siguientes campos tienen errores o deben completarse:
            </p>

            <div>
              <ul>
                {newErrors?.map((err) => {
                  return (
                    <li key={err.path} className={s.ErrorMessage}>
                      {err.message}
                    </li>
                  );
                })}
              </ul>
            </div>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
}
