import { Dispatch, SetStateAction, useState } from 'react';
import { Row, Col } from '@bx-design/react-grid';

import { Modal, ModalClose, ModalBody } from 'components/ui-bx/modal';
import { InputTags } from 'components/ui-bx/forms';
import { Button } from 'components/ui-bx/button';
import styles from './styles.module.scss';
import {
  inviteCollaboratorToPyme,
  InviteCollaboratorResponseType,
} from 'api/pyme/roles';
import celebrateImg from 'images/celebrate.png';
import errorPhoneImg from 'images/error-phone.png';

type Props = {
  isOpen: boolean;
  handleClose: Dispatch<SetStateAction<boolean>>;
  pymeId: string;
};

type Error400Type = {
  status: number;
  data: {
    email: string;
    isSuccess: boolean;
    message: string;
  }[];
  message: string;
};

export default function ManageBusinessInviteModal({
  isOpen,
  handleClose,
  pymeId,
}: Props): JSX.Element {
  const [value, setValue] = useState('');
  const [emails, setEmails] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<string | string[] | null>(null);
  const [resultResponse, setResultResponse] =
    useState<InviteCollaboratorResponseType | null>(null);

  const handleClick = async (): Promise<void> => {
    setIsLoading(true);
    setIsSuccess(false);
    setIsError(false);
    setError(null);
    try {
      const res = await inviteCollaboratorToPyme(pymeId, emails);
      if (res.length > 0) {
        setIsSuccess(true);
        setIsLoading(false);
        setResultResponse(res);
      }
    } catch (err) {
      setIsError(true);
      if ((err as Error400Type).status === 400) {
        const errorData = err as Error400Type;
        if (errorData.data.length === 1) {
          setError(errorData.data[0].message);
        } else if (
          errorData.data.every(
            (errDa) => errDa.message === errorData.data[0].message
          )
        ) {
          setError(errorData.data[0].message);
        } else {
          setError(errorData.data.map((errDa) => errDa.message));
        }
      } else {
        setError('Hemos encontrado un error inesperado');
      }
      setIsLoading(false);
    }
  };

  const handleClickSuccess = (): void => {
    if (isSuccess) {
      window.location.assign(window.location.href);
    }
  };

  const handleClickError = (): void => {
    setIsError(false);
    setError(null);
  };

  return (
    <Modal isOpen={isOpen} toggle={() => handleClose(false)} centered size='lg'>
      {!isSuccess && !isError && (
        <>
          <ModalClose closeButton={() => handleClose(false)} />
          <ModalBody>
            <Row className='mb-12'>
              <Col col='12'>
                <h2 className={styles.Title}>Invita a un integrante</h2>
                <p className={styles.Text}>
                  Ingresa la dirección de correo electrónico del nuevo
                  integrante y luego presiona Enter para continuar.
                </p>
                <InputTags
                  value={value}
                  setValue={setValue}
                  valuesTag={emails}
                  setInputTags={setEmails}
                  placeholder='Ingresar un email'
                />
              </Col>
            </Row>
            <Row className='justify-center'>
              <Col col='4'>
                <Button
                  fullWidth
                  onClick={handleClick}
                  isLoading={isLoading}
                  disabled={isLoading || emails.length === 0}
                >
                  Enviar Invitación
                </Button>
              </Col>
            </Row>
          </ModalBody>
        </>
      )}
      {isSuccess && !isError && resultResponse && (
        <>
          <ModalBody>
            <Row>
              <Col col='12'>
                <div className={styles.Box}>
                  <div className={styles.ImageBox}>
                    <img src={celebrateImg} alt='Solicitud enviada con éxito' />
                  </div>
                </div>
                <h2 className={styles.Title}>Solicitud enviada con éxito</h2>
                <p className={styles.ModalText}>
                  Haz enviado una solicitud{' '}
                  {resultResponse.length === 1 ? 'al correo' : 'a los correos'}{' '}
                  <strong>
                    {resultResponse.map((resResponse, index) => {
                      if (resultResponse.length === index + 1) {
                        return `${resResponse.email}.`;
                      }
                      return `${resResponse.email}, `;
                    })}
                  </strong>
                </p>
                {resultResponse.map((resResponse) => {
                  if (!resResponse.isSuccess) {
                    return (
                      <p className={styles.ModalText}>
                        El usuario <strong>{resResponse.email}</strong> ya tiene
                        una invitación pendiente.
                      </p>
                    );
                  }
                  return '';
                })}
              </Col>
            </Row>
            <Row className='justify-center'>
              <Col col='4'>
                <Button fullWidth onClick={handleClickSuccess}>
                  Aceptar
                </Button>
              </Col>
            </Row>
          </ModalBody>
        </>
      )}
      {!isSuccess && isError && error && (
        <>
          <ModalClose closeButton={handleClickError} />
          <ModalBody>
            <Row>
              <Col col='12'>
                <div className={styles.Box}>
                  <div className={styles.ImageBox}>
                    <img src={errorPhoneImg} alt='¡Oh no!' />
                  </div>
                </div>
                <h2 className={styles.Title}>¡Oh no!</h2>
                {Array.isArray(error) ? (
                  <>
                    {error.map((errMsg, i) => (
                      <p className={styles.Text} key={i}>
                        {errMsg}
                      </p>
                    ))}
                  </>
                ) : (
                  <p className={styles.Text}>{error}</p>
                )}
              </Col>
            </Row>
            <Row className='justify-center'>
              <Col col='4'>
                <Button fullWidth onClick={handleClickError}>
                  Volver a intentarlo
                </Button>
              </Col>
            </Row>
          </ModalBody>
        </>
      )}
    </Modal>
  );
}
