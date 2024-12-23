import { useAtom } from 'jotai';
import { tipsViewAtom } from 'atoms/dashboard';

import { Container, Row, Col } from '@bx-design/react-grid';
import { Card, CardBody } from 'components/ui-bx/card';
import {
  Button,
  ButtonExternalLink,
  ButtonLink,
} from 'components/ui-bx/button';

import styles from './main.module.scss';

function MainTips(): JSX.Element {
  const [, setView] = useAtom(tipsViewAtom);

  return (
    <>
      <Container fluid>
        <Row>
          <Col col='12'>
            <h1 className={styles.TipsTitle}>Tips</h1>
          </Col>
          <Col col='12'>
            <Row>
              <Col col='12' lg='4' className='mb-2 lg:mb-6'>
                <Card>
                  <CardBody padding='dashboard'>
                    <h2 className={styles.TipsSingleTitle}>
                      Paso a paso de los envíos
                    </h2>
                    <p className={styles.cardText}>
                      Conoce todas las etapas que vivirán tus encomiendas
                    </p>
                    <Row className='justify-center'>
                      <Col col='12' lg='10'>
                        <Button
                          fullWidth
                          onClick={() => {
                            setView(4);
                            window.scrollTo(0, 0);
                          }}
                        >
                          Flujo de envío
                        </Button>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col col='12' lg='4' className='mb-2 lg:mb-6'>
                <Card>
                  <CardBody padding='dashboard'>
                    <h2 className={styles.TipsSingleTitle}>
                      Conoce las cargas prohibidas
                    </h2>
                    <p className={styles.cardText}>
                      Conoce las características de las cargas que
                      <b> NO</b> podemos transportar.
                    </p>
                    <Row className='items-center justify-center'>
                      <Col col='12' lg='10'>
                        <ButtonLink fullWidth to='/tips/dangerous-merchandise'>
                          Carga prohibida
                        </ButtonLink>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col col='12' lg='4' className='mb-2 lg:mb-6'>
                <Card>
                  <CardBody padding='dashboard'>
                    <h2 className={styles.TipsSingleTitle}>
                      Encuentra tu etiqueta
                    </h2>
                    <p className={styles.cardText}>
                      Este video te ayudará a saber donde puedes encontrar tu
                      etiqueta para imprimir.
                    </p>
                    <Row className='items-center justify-center'>
                      <Col col='12' lg='10'>
                        <ButtonExternalLink
                          fullWidth
                          href='https://www.youtube.com/watch?v=-bBHScaF9Vw'
                        >
                          Ver Video
                        </ButtonExternalLink>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Col>
          <Col col='12'>
            <Row>
              <Col col='12' lg='4' className='mb-2 lg:mb-6'>
                <Card>
                  <CardBody padding='dashboard'>
                    <h2 className={styles.TipsBottomSectionTitle}>
                      Embalaje y <br /> etiquetado
                    </h2>
                    <p className={styles.cardBottomText}>
                      Conoce todos los consejos para que puedas enviar tus
                      pedidos de forma exitosa.
                    </p>
                    <Row className='items-center justify-center'>
                      <Col col='12' lg='10'>
                        <ButtonExternalLink
                          href='/images/pauta-embalaje-bx.jpg'
                          fullWidth
                        >
                          Descargar pauta
                        </ButtonExternalLink>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col col='12' lg='4'>
                <Card>
                  <CardBody padding='dashboard'>
                    <h2 className={styles.TipsBottomSectionTitle}>
                      Puntos Blue Express
                    </h2>
                    <p className={styles.cardBottomText}>
                      Contamos con más de 600 alianzas comerciales con tiendas,
                      almacenes y locales en todas las regiones para que puedas
                      enviar y/o recibir encomiendas.
                    </p>
                    <Row className='items-center justify-center'>
                      <Col col='12' lg='10'>
                        <Button
                          fullWidth
                          onClick={() => {
                            setView(3);
                            window.scrollTo(0, 0);
                          }}
                        >
                          Ver Puntos Blue Express
                        </Button>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col col='12' lg='4' className='mb-2 lg:mb-6'>
                <Card>
                  <CardBody padding='dashboard'>
                    <h2 className={styles.TipsBottomSectionTitle}>
                      Excepciones de servicio
                    </h2>
                    <p className={styles.cardBottomText}>
                      Todos los pedidos son monitoreados por nuestro equipo,
                      pero si se presenta algún inconveniente te informamos para
                      resolver cada caso.
                    </p>
                    <Row className='items-center justify-center'>
                      <Col col='12' lg='10'>
                        <Button
                          fullWidth
                          onClick={() => {
                            setView(5);
                            window.scrollTo(0, 0);
                          }}
                        >
                          Más información
                        </Button>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default MainTips;
