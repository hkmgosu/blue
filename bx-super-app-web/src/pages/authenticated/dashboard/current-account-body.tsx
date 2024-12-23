import { Col, Container, Row } from '@bx-design/react-grid';
import { ModalBody } from 'components/ui-bx/modal';
import { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './current-account-modal.module.scss';
import cs from 'classnames';
import { Button } from 'components/ui-bx/button';
import { NaturalPersonModal } from './modal-natural-person';
import { ShowAlert } from 'components/ui-bx/alert';
import { useAtom } from 'jotai';
import { errorAtom, isRutValidAtom } from 'atoms/dashboard';
import { newShippingModalAtom } from 'atoms/new-shipping/new';

export const CurrentAccountBody: FC = () => {
  const history = useHistory();
  const [error, setError] = useAtom(errorAtom);
  const [isError, setIsError] = useAtom(isRutValidAtom);
  const [showError, setShowError] = useState(false);
  const [, setNewShippingModal] = useAtom(newShippingModalAtom);

  useEffect(() => {
    if (error) {
      setShowError(true);
    }
  }, [error, setShowError]);

  const handleClose = (): void => {
    setIsError(false);
    setError('');
    setShowError(false);
  };

  return (
    <div className={styles.currentAccountBodyContainer}>
      <ModalBody>
        <Container fluid>
          <Row className='items-center justify-center'>
            <Col>
              <h2 className={cs(styles.title, styles.center)}>
                ¡Hola! Necesitamos que actualices tus datos
              </h2>
            </Col>
          </Row>
          <Row className='items-stretch justify-center mt-12'>
            <Col col='6'>
              <div className={styles.container}>
                <h3 className={styles.subtitle}>¿Tienes RUT de empresa?</h3>
                <p>Necesitamos que completes tus datos de facturación.</p>
                <div className={styles.buttonContainer}>
                  <Button
                    onClick={() => {
                      setNewShippingModal(false);
                      history.push('/pyme-billing-info-form');
                    }}
                  >
                    Datos de facturación
                  </Button>
                </div>
              </div>
            </Col>
            <Col col='6'>
              <NaturalPersonModal />
            </Col>
            <Col className='ml-[50%]'>
              {isError && (
                <Col col='12' className='mt-6'>
                  <ShowAlert
                    variant='danger'
                    isOpen={showError}
                    handleClose={() => handleClose()}
                  >
                    {error}
                  </ShowAlert>
                </Col>
              )}
            </Col>
          </Row>
        </Container>
      </ModalBody>
    </div>
  );
};
