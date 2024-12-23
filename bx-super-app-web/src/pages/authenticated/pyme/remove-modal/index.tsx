import { Col, Row } from '@bx-design/react-grid';
import { deletePymeCollaborator } from 'api/pyme/roles';

import { Button } from 'components/ui-bx/button';
import { Modal, ModalBody } from 'components/ui-bx/modal';
import globoalert from 'images/globoalert.png';
import errorPhoneImg from 'images/error-phone.png';
import celebrateImg from 'images/celebrate.png';
import { useState } from 'react';
import styles from './styles.module.scss';

type Props = {
  isOpen: boolean;
  selectRemoveUser: {
    pymeName: string;
    pymeId: string;
    userId: string;
    name: string;
  };
  handleModalClose: () => void;
};

export default function RemoveModal({
  isOpen,
  selectRemoveUser,
  handleModalClose,
}: Props): JSX.Element {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRemoveMember = async (): Promise<void> => {
    setIsSuccess(false);
    setIsLoading(true);
    setIsError(false);
    setError(null);
    try {
      const res = await deletePymeCollaborator(
        selectRemoveUser.pymeId,
        selectRemoveUser.userId
      );
      if (res) {
        setIsSuccess(true);
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      setIsError(true);
      setError('Ocurrió un error al intentar eliminar al integrante.');
    }
  };

  const handleClickReload = (): void => {
    if (isSuccess) {
      window.location.assign(window.location.href);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={handleModalClose}
      backdrop='static'
      centered
      keyboard
    >
      <ModalBody>
        {!isError && !isSuccess && (
          <Row className='justify-center'>
            <Col col='10'>
              <div className={styles.imageBox}>
                <img
                  className={styles.img}
                  src={globoalert}
                  alt='Eliminar integrante'
                />
              </div>
              <div className={styles.content}>
                <p className={styles.text}>
                  ¿Estás seguro que quieres eliminar al integrante{' '}
                  <strong>{selectRemoveUser.name}</strong> de{' '}
                  <strong>{selectRemoveUser.pymeName}</strong>?
                </p>
              </div>
              <div className={styles.buttonGroup}>
                <Button
                  onClick={handleRemoveMember}
                  isLoading={isLoading}
                  disabled={isLoading}
                >
                  Sí
                </Button>
                <button className={styles.button} onClick={handleModalClose}>
                  <span className={styles.buttonText}>No</span>
                </button>
              </div>
            </Col>
          </Row>
        )}
        {!isError && isSuccess && (
          <Row className='justify-center'>
            <Col col='10'>
              <div className={styles.imageBox}>
                <img className={styles.img} src={celebrateImg} alt='Éxito' />
              </div>
              <div className={styles.content}>
                <p className={styles.text}>Integrante eliminado con éxito</p>
              </div>
              <div className={styles.buttonGroupSuccess}>
                <Button onClick={handleClickReload}>Continuar</Button>
              </div>
            </Col>
          </Row>
        )}
        {isError && error && (
          <Row className='justify-center'>
            <Col col='10'>
              <div className={styles.imageBox}>
                <img className={styles.img} src={errorPhoneImg} alt='Error' />
              </div>
              <div className={styles.content}>
                <p className={styles.text}>{error}</p>
              </div>
              <div className={styles.buttonGroup}>
                <Button
                  onClick={handleRemoveMember}
                  isLoading={isLoading}
                  disabled={isLoading}
                >
                  Reintentar
                </Button>
                <button className={styles.button} onClick={handleModalClose}>
                  <span className={styles.buttonText}>Cancelar</span>
                </button>
              </div>
            </Col>
          </Row>
        )}
      </ModalBody>
    </Modal>
  );
}
