import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { Row, Col } from '@bx-design/react-grid';

import { Modal, ModalClose, ModalBody } from 'components/ui-bx/modal';
import { Select } from 'components/ui-bx/forms';
import { Button } from 'components/ui-bx/button';
import styles from './styles.module.scss';
import { usePyme } from 'contexts/pyme/pyme-context';
import { inviteAdminToPyme, InviteAdminResponseType } from 'api/pyme/roles';
import celebrateImg from 'images/celebrate.png';
import errorPhoneImg from 'images/error-phone.png';

type Props = {
  isOpen: boolean;
  handleClose: Dispatch<SetStateAction<boolean>>;
  pymeId: string;
};

export default function ManageBusinessAssignModal({
  isOpen,
  handleClose,
  pymeId,
}: Props): JSX.Element {
  const { pymeList } = usePyme();
  const [value, setValue] = useState('0');
  const [options, setOptions] = useState([
    {
      value: '0',
      name: 'Introduce el nombre de tu próximo administrador',
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultResponse, setResultResponse] =
    useState<InviteAdminResponseType | null>(null);

  const collaboratorsOptions = useMemo(
    () =>
      pymeList
        ?.find((pyme) => pyme.id === pymeId)
        ?.collaborators?.map((coll) => {
          return {
            value: coll.email,
            name: `${coll.firstName} ${coll.lastName}`,
          };
        }),
    [pymeList, pymeId]
  );

  useEffect(() => {
    if (collaboratorsOptions) {
      setOptions((prev) => {
        let newOptions = collaboratorsOptions;
        newOptions.unshift(prev[0]);
        return newOptions;
      });
    }
  }, [collaboratorsOptions]);

  const handleClick = async (): Promise<void> => {
    setIsLoading(true);
    setIsSuccess(false);
    setIsError(false);
    setError(null);
    setResultResponse(null);
    try {
      const res = await inviteAdminToPyme(pymeId, value);
      if (res.isSuccess) {
        setIsSuccess(true);
        setIsLoading(false);
        setResultResponse(res);
      }
    } catch (err) {
      setIsError(true);
      setError('Hemos encontrado un error inesperado');
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
                <h2 className={styles.Title}>Asigna un nuevo administrador</h2>
                <p className={styles.Text}>
                  Escoge entre los intengrantes quién será el administrador.
                </p>
                <Select
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  options={options}
                />
              </Col>
            </Row>
            <Row className='justify-center'>
              <Col col='4'>
                <Button
                  fullWidth
                  onClick={handleClick}
                  isLoading={isLoading}
                  disabled={
                    isLoading ||
                    pymeList?.find((pyme) => pyme.id === pymeId)?.collaborators
                      ?.length === 1
                  }
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
                {!resultResponse.isSuccess && (
                  <>
                    <h2 className={styles.Title}>
                      La solicitud ha sido enviada.
                    </h2>
                    <p className={styles.Text}>
                      El usuario <strong>{resultResponse.email}</strong> ya
                      tiene una invitación pendiente
                    </p>
                  </>
                )}
                {resultResponse.isSuccess && (
                  <>
                    <h2 className={styles.Title}>
                      La solicitud ha sido enviada con éxito.
                    </h2>
                    <p className={styles.Text}>
                      Haz enviado una solicitud de asignación como administrador
                      a <strong>{resultResponse.email}</strong>.
                    </p>
                  </>
                )}
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
          <ModalClose closeButton={() => handleClose(false)} />
          <ModalBody>
            <Row>
              <Col col='12'>
                <div className={styles.Box}>
                  <div className={styles.ImageBox}>
                    <img src={errorPhoneImg} alt='¡Oh no!' />
                  </div>
                </div>
                <h2 className={styles.Title}>¡Oh no!</h2>
                <p className={styles.Text}>
                  Hemos encontrado un error inesperado
                </p>
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
