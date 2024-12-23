import { useCallback, useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { Row, Col } from '@bx-design/react-grid';
import { useHistory } from 'react-router-dom';
import { queryClient } from 'query-client';

import type { PymeType, UserType } from 'types/auth';
import { Modal, ModalBody } from 'components/ui-bx/modal';
import { Card, CardBody } from 'components/ui-bx/card';
import { newShippingModalAtom } from 'atoms/new-shipping/new';
import { Button } from 'components/ui-bx/button';
import { useAuth } from 'contexts/auth-context';
import styles from './modal.module.scss';
import imgUnitary from 'images/unitario.jpg';
import imgMulti from 'images/enviovarios.jpg';
import billingImg from 'images/factura.png';
/**
 * @todo Descomentar al habilita masivo
 */
import imgMassive from 'images/masivo.jpg';
import { usePyme } from 'contexts/pyme/pyme-context';
import { useIsNaturalPerson } from 'hooks/pyme/use-is-natural-person';
import NewShippingLayoutModalRut from './modal-rut';
import { CurrentAccountBody } from 'pages/authenticated/dashboard/current-account-body';

function NewShippingLayoutNewModal(): JSX.Element {
  const [newShippingModal, setNewShippingModal] = useAtom(newShippingModalAtom);
  const history = useHistory();
  const { user } = useAuth();
  const { isNaturalPerson } = useIsNaturalPerson();
  const { defaultPyme } = usePyme();
  const [billing, setBilling] = useState(
    defaultPyme ? defaultPyme.has_billing_information : ''
  );
  const [isTransparent] = useState(!billing ? false : true);
  const [modalSize, setModalSize] = useState<any>('xl');

  const handleClick = useCallback(
    (path?: string) => {
      if (path) {
        setNewShippingModal(false);
        setTimeout(() => history.push(path), 500);
      }
    },
    [history, setNewShippingModal]
  );

  const handleModalViewChange = (): void => {
    setModalSize('xl');
    setBilling(true);
  };

  useEffect(() => {
    if (!defaultPyme?.has_billing_information) {
      const userQuery = queryClient.getQueryData<UserType>('user');
      const noModalUser = userQuery?.pymes?.map((data: PymeType) => {
        return {
          ...data,
          has_billing_information: true,
        };
      });
      queryClient.setQueryData('user', {
        ...user,
        pymes: noModalUser,
      });
    } else {
      setModalSize('xl');
      setBilling(defaultPyme.has_billing_information);
    }
  }, [
    setBilling,
    user,
    newShippingModal,
    defaultPyme?.has_billing_information,
  ]);

  return (
    <Modal
      isOpen={newShippingModal}
      toggle={() => setNewShippingModal(false)}
      centered
      backdrop
      keyboard
      transparent={isTransparent}
      size={modalSize}
    >
      {!user?.pymes ? (
        <NewShippingLayoutModalRut />
      ) : !billing ? (
        <CurrentAccountBody />
      ) : isNaturalPerson || billing ? (
        <ModalBody>
          <Row className='xl:items-stretch xl:justify-center'>
            <Col col='12' xl='4'>
              <Card>
                <CardBody padding='dashboard'>
                  <div
                    className={`${styles.wrapper} ${styles.wrapperNotPadding}`}
                  >
                    <h3 className={styles.title}>Envío unitario</h3>
                    <div className={styles.box}>
                      <div className={styles.imageBox}>
                        <img
                          className={styles.img}
                          src={imgUnitary}
                          alt='Envío unitario'
                        />
                      </div>
                    </div>
                    <div className={styles.text}>
                      Selecciona para crear un único envío de forma manual.
                    </div>
                    <div className={styles.box}>
                      <Button
                        onClick={() => handleClick('/new-shipping/unitary')}
                      >
                        Realizar envío
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col col='12' xl='4' className='hidden xl:block'>
              <Card>
                <CardBody padding='dashboard'>
                  <div
                    className={`${styles.wrapper} ${styles.wrapperNotPadding}`}
                  >
                    <h3 className={styles.title}>2 a 5 envíos</h3>
                    <div className={styles.box}>
                      <div className={styles.imageBox}>
                        <img
                          className={styles.img}
                          src={imgMulti}
                          alt='2 a 5 envíos'
                        />
                      </div>
                    </div>
                    <div className={styles.text}>
                      Selecciona para crear hasta 5 envíos a la vez: cada uno
                      con su propio origen y destinatario. Destino a domicilio o
                      Punto Blue
                    </div>
                    <div className={styles.box}>
                      <Button
                        onClick={() => handleClick('/new-shipping/multi')}
                      >
                        Realizar envíos
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col col='12' xl='4' className='hidden xl:block'>
              <Card>
                <CardBody padding='dashboard'>
                  <div
                    className={`${styles.wrapper} ${styles.wrapperNotPadding}`}
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        zIndex: 1,
                        top: '-80px',
                        background: '#FF7A44',
                        width: '100%',
                        maxWidth: '254px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '15px',
                        textAlign: 'center',
                        color: '#fff',
                        padding: '12px, 16px, 12px, 16px',
                      }}
                    >
                      <span className={styles.subTitle}>¡NUEVO!</span>
                      <p className={styles.subTitleTop}>
                        Hasta 50 envíos destino domicilio prepago o por pagar
                      </p>
                    </div>
                    <h3 className={styles.title}>Carga masiva</h3>
                    <div className={styles.box}>
                      <div className={styles.imageBox}>
                        <img
                          className={styles.img}
                          src={imgMassive}
                          alt='Carga masiva'
                        />
                      </div>
                    </div>
                    <div className={styles.text}>
                      Selecciona para realizar hasta 50 envíos, usando una hoja
                      de cálculo excel. Descarga nuestra plantilla, rellénala e
                      importa los datos.
                    </div>
                    <div className={styles.box}>
                      <Button
                        onClick={() => handleClick('/new-shipping/massive')}
                      >
                        Carga masiva
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </ModalBody>
      ) : (
        <ModalBody>
          <div className={styles.billingWrapper}>
            <div className={styles.box}>
              <div className={styles.imageBilling}>
                <img className={styles.img} src={billingImg} alt='Billing' />
              </div>
            </div>
            <div className={styles.textBilling}>
              Si quieres recibir la factura de tus envíos, necesitamos que
              completes <br /> por única vez un formulario con los datos para la
              facturación. <br /> Si no los recuerdas, puedes optar por una
              boleta.
            </div>
            <br />
            <div className={styles.boxBilling}>
              <Button
                onClick={() => {
                  setNewShippingModal(false);
                  history.push('/pyme-billing-info-form');
                }}
              >
                Factura
              </Button>
              <Button
                onClick={() => {
                  handleModalViewChange();
                }}
              >
                Boleta
              </Button>
            </div>
          </div>
        </ModalBody>
      )}
    </Modal>
  );
}

export default NewShippingLayoutNewModal;
