import { Row, Col } from '@bx-design/react-grid';
import { Modal, ModalBody, ModalClose } from 'components/ui-bx/modal';
import alertImg from 'images/globoalert.png';
import { useMemo } from 'react';
import s from './modal-styles.module.scss';
import { useMultiEmissionValidate } from 'emission-lib/hooks/errors';

type Props = {
  isOpen: boolean;
  toggle: (to: boolean) => void;
};

export default function Modal3({ isOpen, toggle }: Props): JSX.Element {
  const { errors } = useMultiEmissionValidate();
  const newErrors2 = useMemo(
    () => [
      ...new Map(
        errors
          ?.map((err) => {
            if (
              err.message.includes(
                'package[0].shipping_service.codeDestination'
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
                'package[0].shipping_service.codeDestination'
              )
            ) {
              return {
                ...err,
                message:
                  'Tipo de Servicio: Se debe seleccionar el Tipo de Servicio',
              };
            }
            if (
              err.message.includes('package[0].shipping_service.codeOrigin')
            ) {
              return {
                ...err,
                message:
                  'Tipo de Servicio: Se debe seleccionar el Tipo de Servicio',
              };
            }
            if (
              err.message.includes(
                'package[0].shipping_service.codeDestination'
              )
            ) {
              return {
                ...err,
                message:
                  'Tipo de Servicio: Se debe seleccionar el Tipo de Servicio',
              };
            }
            if (err.message.includes('package[0].warranty_value')) {
              return {
                ...err,
                message: 'Valor del Contenido: El valor es requerido',
              };
            }
            return err;
          })
          .map((err) => [err.message, err])
      ).values(),
    ],
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
            {newErrors2.length > 0 && (
              <p className={s.Title}>
                Los siguientes campos tienen errores o deben completarse:
              </p>
            )}
            {!(newErrors2.length > 0) && (
              <p className={s.Title}>
                ¡Tienes campos con errores o sin llenar de alguno de los envíos!
                Corrígelos para continuar
              </p>
            )}
            <div>
              {newErrors2 && (
                <ul>
                  {newErrors2.map((err) => {
                    return (
                      <li key={err.path} className={s.ErrorMessage}>
                        {err.message}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
}
