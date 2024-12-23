import { Row, Col } from '@bx-design/react-grid';
import { Modal, ModalBody, ModalClose } from 'components/ui-bx/modal';
import { useShippingDestinyValidate } from 'emission-lib/hooks/shipping-destiny';
import { useEmissionDtoValidate } from 'emission-lib/hooks/dto';
import alertImg from 'images/globoalert.png';
import { useMemo } from 'react';
import s from './modal-styles.module.scss';

type Props = {
  isOpen: boolean;
  toggle: (to: boolean) => void;
};

export default function Modal2({ isOpen, toggle }: Props): JSX.Element {
  const { errors } = useShippingDestinyValidate();
  const { errors: errors2 } = useEmissionDtoValidate();
  const newErrors = useMemo(
    () => [...new Map(errors?.map((err) => [err.message, err])).values()],
    [errors]
  );
  const newErrors2 = useMemo(
    () => [
      ...new Map(
        errors2
          ?.map((err) => {
            if (
              err.message.includes(
                'shipping[0].package[0].shipping_service.codeDestination'
              )
            ) {
              return {
                ...err,
                message:
                  'Tipo de Servicio: Se debe seleccionar el Tipo de Servicio',
              };
            }
            if (
              err.message.includes(
                'shipping[0].package[0].shipping_service.codeOrigin'
              )
            ) {
              return {
                ...err,
                message:
                  'Tipo de Servicio: Se debe seleccionar el Tipo de Servicio',
              };
            }
            return err;
          })
          .map((err) => [err.message, err])
      ).values(),
    ],
    [errors2]
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
                {newErrors2?.map((err) => {
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
