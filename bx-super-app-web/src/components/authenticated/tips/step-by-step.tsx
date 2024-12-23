import { useAtom } from 'jotai';

import { Col, Row } from '@bx-design/react-grid';
import { BxLeft } from '@bx-design/react-icons';
import { tipsViewAtom } from 'atoms/dashboard';
import { Card, CardBody } from 'components/ui-bx/card';
import styles from './step-by-step.module.scss';
import enviosvarios from 'images/enviovarios.jpg';
import form from 'images/form1.png';
import coin from 'images/tips/moneda-check.png';
import truck from 'images/tips/camion-cajas.png';

function StepByStep(): JSX.Element {
  const [, setView] = useAtom(tipsViewAtom);

  return (
    <Row className='lg:justify-center'>
      <Col col='12' className='mb-4 lg:mb-0'>
        <div className={styles.backLink} onClick={() => setView(1)}>
          <div className={styles.backBoxIcon}>
            <BxLeft color='var(--bx-color-lblue)' size='20' />
          </div>
          <div>Volver atrás</div>
        </div>
      </Col>
      <Col col='12' className='lg:mb-6'>
        <h1 className={styles.title}>Paso a paso de los envíos</h1>
      </Col>
      <Col lg='3' col='12' className='mb-2 lg:mb-0'>
        <Card className='h-28 md:h-auto'>
          <CardBody padding='dashboard'>
            <Row className='justify-center items-center'>
              <Col col='3' lg='12' sm='12'>
                <div className={styles.numberContainer}>1</div>
              </Col>
              <Col col='9' lg='12'>
                <div className={styles.textContainer}>
                  Inscribe tu empresa, completa los datos y realiza tus envíos
                  pre-pagados.
                </div>
              </Col>
              <Col col='12' lg='12' className='hidden md:block'>
                <div className={styles.imageContainer}>
                  <img src={coin} alt='coin' className={styles.image} />
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
      <Col lg='3' col='12' className='mb-2 lg:mb-0'>
        <Card className='h-28 md:h-auto'>
          <CardBody padding='dashboard'>
            <Row className='items-center justify-center'>
              <Col col='3' lg='12'>
                <div className={styles.numberContainer}>2</div>
              </Col>
              <Col col='9' lg='12'>
                <div className={styles.textContainer}>
                  ¡Prepara tus envíos! Imprime tus etiquetas y previamente
                  embaladas.
                </div>
              </Col>
              <Col col='12' lg='12' className='hidden md:block'>
                <div className={styles.imageContainer}>
                  <img src={form} alt='form' className={styles.image} />
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
      <Col lg='3' col='12' className='mb-2 lg:mb-0'>
        <Card className='h-28 md:h-auto'>
          <CardBody padding='dashboard'>
            <Row className='items-center justify-center'>
              <Col col='3' lg='12'>
                <div className={styles.numberContainer}>3</div>
              </Col>
              <Col col='9' lg='12'>
                <div className={styles.textContainer}>
                  Entrega tus envíos en el punto Blue Express que más te
                  acomode.
                </div>
              </Col>
              <Col col='12' lg='12' className='hidden md:block'>
                <div className={styles.imageContainer}>
                  <img src={enviosvarios} alt='box' className={styles.image} />
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
      <Col lg='3' col='12' className='mb-2 lg:mb-0'>
        <Card className='h-28 md:h-auto'>
          <CardBody padding='dashboard'>
            <Row className='items-center justify-between'>
              <Col col='3' lg='12'>
                <div className={styles.numberContainer}>4</div>
              </Col>
              <Col col='9' lg='11'>
                <div className={styles.textContainer}>
                  ¡Relájate! Nosotros nos encargamos de llevar los pedidos a sus
                  destinatarios.
                </div>
              </Col>
              <Col col='12' lg='12' className='hidden md:block'>
                <div className={styles.imageContainer}>
                  <img src={truck} alt='truck' className={styles.image} />
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}

export default StepByStep;
