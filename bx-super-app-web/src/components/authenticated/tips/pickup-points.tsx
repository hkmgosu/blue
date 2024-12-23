import { Col, Row } from '@bx-design/react-grid';
import { BxLeft } from '@bx-design/react-icons';
import { tipsViewAtom } from 'atoms/dashboard';
import { Card, CardBody } from 'components/ui-bx/card';
import { useAtom } from 'jotai';

import styles from './pickup-point.module.scss';
import pickup from 'images/new-shipping/pickup.png';

function PickupPoints(): JSX.Element {
  const [, setView] = useAtom(tipsViewAtom);

  return (
    <Row className='lg:justify-center'>
      <Col col='12' className='mb-4 lg:mb-0'>
        <div className={styles.backLink} onClick={() => setView(1)}>
          <div className={styles.backBoxIcon}>
            <BxLeft color='var(--bx-color-lblue)' size={20} />
          </div>
          <div>Volver atrás</div>
        </div>
      </Col>
      <Col col='12' className='lg:mb-6'>
        <h1 className={styles.title}>Conoce nuestros puntos Blue Express</h1>
      </Col>

      <Col col='12' lg='7'>
        <Card marginBottom>
          <CardBody padding='dashboard'>
            <Row className='items-center justify-center'>
              <Col col='2' lg='1' className='my-1 lg:my-0'>
                <div className={styles.cardNumber}>
                  <span>1</span>
                </div>
              </Col>
              <Col col='10' lg='11'>
                <div className={styles.cardText}>
                  ¿Qué son? Son almacenes y locales comerciales que tienen una
                  alianza con Blue Express y le permite a nuestros clientes
                  tener la comodidad de entregar y retirar sus encomiendas en la
                  cercanía
                  <br /> de su hogar o lugar de preferencia.
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
        <Card marginBottom>
          <CardBody padding='dashboard'>
            <Row className='items-center justify-center'>
              <Col col='2' lg='1' className='my-1 lg:my-0'>
                <div className={styles.cardNumber}>2</div>
              </Col>
              <Col col='10' lg='11'>
                <div className={styles.cardText}>
                  Beneficios para ti: <br />
                  <div className={styles.listContainer}>
                    <li>
                      La mayoría de nuestros puntos tiene horario extendido
                    </li>
                    <li>Posibilidad de hacer varias cosas en un solo lugar</li>
                    <li>Capacitamos constantemente a nuestros Puntos</li>
                    <li>
                      Nuestra mayor preocupación es entregar el mejor servicio a
                    </li>
                    <p className={styles.margin}>tu cliente</p>
                  </div>
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
        <Card marginBottom>
          <CardBody padding='dashboard'>
            <Row className='items-center justify-center'>
              <Col col='2' lg='1' className='my-1 lg:my-0'>
                <div className={styles.cardNumber}>3</div>
              </Col>
              <Col col='10' lg='11'>
                <div className={styles.cardText}>
                  Dudas o consultas: Te recordamos que siempre tienes disponible
                  en tu sesión una asistencia por WhatsApp. Si necesitas ayuda
                  prefiere este canal para tener una respuesta rápida.
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
        <Card marginBottom>
          <CardBody padding='dashboard'>
            <Row className='items-center justify-center'>
              <Col col='2' lg='1' className='my-1 lg:my-0'>
                <div className={styles.cardNumber}>4</div>
              </Col>
              <Col col='10' lg='11'>
                <div className={styles.cardTextWithLink}>
                  Revisa el punto Blue Express más cercano a ti,
                  <a
                    className={styles.orangeLink}
                    href='https://www.blue.cl/punto-blue-express/'
                    target='_blank'
                    rel='noreferrer'
                  >
                    haciendo clic aquí
                  </a>
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
      <Col className='flex justify-center lg:hidden'>
        <img src={pickup} alt='pickup' className={styles.pickupImage} />
      </Col>
    </Row>
  );
}

export default PickupPoints;
