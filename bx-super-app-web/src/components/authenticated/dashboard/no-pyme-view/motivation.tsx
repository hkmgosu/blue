import { FC, useState } from 'react';
import { useMutation } from 'react-query';

import styles from './motivation.module.scss';
import { Row, Col } from '@bx-design/react-grid';
import { Card, CardBody } from 'components/ui-bx/card';
import { Button } from 'components/ui-bx/button';
import { userUpdateFirstLoginApi } from 'api/user';
import { useAtom } from 'jotai';
import { butonActivateOnStepper } from 'atoms/dashboard';
import celebrate from 'images/celebrate.png';

const MotivationCard: FC = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [, setActivateButtons] = useAtom(butonActivateOnStepper);
  const { isLoading, mutate } = useMutation<{}, Error, { firstSteps: boolean }>(
    (dataForMutate) => userUpdateFirstLoginApi(dataForMutate),
    {
      onSuccess: async () => {
        setShowMessage(true);
        setActivateButtons(false);
      },
    }
  );

  const handleClick = async (): Promise<void> => {
    mutate({ firstSteps: false });
  };

  return (
    <Card>
      <CardBody>
        <Row className='mb-6'>
          <Col col='7' md='10'>
            <div className={styles.title}>¡Comencemos con tus envíos!</div>
          </Col>
        </Row>
        <Row>
          <Col col='12' lg='6'>
            <Row className='mb-6 items-center'>
              <Col col='2' lg='2'>
                <div className={styles.dot}>
                  <p className={styles.dotNumber}>1</p>
                </div>
              </Col>
              <Col lg='10'>
                <div className={styles.text}>
                  Inscribe tu empresa o RUT personal y completa los datos de tus
                  envíos
                </div>
              </Col>
            </Row>
            <Row className='mb-6 items-center'>
              <Col col='2' lg='2'>
                <div className={styles.dot}>
                  <p className={styles.dotNumber}>2</p>
                </div>
              </Col>
              <Col lg='10'>
                <div className={styles.text}>
                  Realiza el pago, imprime las etiquetas y prepara tus pedidos
                </div>
              </Col>
            </Row>
            <Row className='mb-6 items-center'>
              <Col col='2' lg='2'>
                <div className={styles.dot}>
                  <p className={styles.dotNumber}>3</p>
                </div>
              </Col>
              <Col lg='10'>
                <div className={styles.text}>
                  Deja tus pedidos en el punto Blue Express que más te acomode
                </div>
              </Col>
            </Row>
            <Row className='mb-6 items-center'>
              <Col col='2' lg='2'>
                <div className={styles.dot}>
                  <p className={styles.dotNumber}>4</p>
                </div>
              </Col>
              <Col lg='10'>
                <div className={styles.text}>
                  Nosotros nos encargamos de llevar los pedidos al destinatario
                </div>
              </Col>
            </Row>
          </Col>
          <Col col='12' lg='6'>
            <Row>
              <Col lg='12'>
                <div className={styles.imageContainer}>
                  <img
                    src={celebrate}
                    alt='celebrate'
                    className={styles.image}
                  />
                  {!showMessage ? (
                    <Button
                      fullWidth
                      onClick={handleClick}
                      isLoading={isLoading}
                    >
                      Comenzar
                    </Button>
                  ) : (
                    <div className={styles.wellDone}>¡Bien hecho! </div>
                  )}
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className='items-center justify-center'></Row>
      </CardBody>
    </Card>
  );
};

export default MotivationCard;
