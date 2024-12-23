import { Col, Row } from '@bx-design/react-grid';
import { Button } from 'components/ui-bx/button';
import style from './index.module.scss';
import cancel from 'images/compensation/anulacion-servicio.png';
import search from 'images/compensation/search-papper.png';
import handsBox from 'images/dashboard/handsbox.png';
import { useHistory } from 'react-router-dom';

export default function CompensationMenuTab(): JSX.Element {
  const history = useHistory();
  return (
    <Row>
      <Row>
        <Col col='12' lg='4'>
          <div className={style.selectorContent}>
            <div className={style.selectorTitle}>Anulación de envío</div>
            <div className={style.selectorImageContainer}>
              <img
                src={cancel}
                alt='Indemnización unitaria'
                className={style.img}
              />
            </div>
            <div className={style.selectorText}>
              Si aún no has entregado tu envío en el punto Blue Express puedes
              solicitar la anulación del servicio.
            </div>
            <div className={style.selectorButton}>
              <Button
                onClick={() => history.push('/shipments/cancel-order-service')}
              >
                Anulación
              </Button>
            </div>
          </div>
        </Col>
        <Col col='12' lg='4'>
          <div className={style.selectorContent}>
            <div className={style.selectorTitle}>
              Solicitud de indemnización
            </div>
            <div className={style.selectorImageContainer}>
              <img
                src={search}
                alt='Indemnización unitaria'
                className={style.img}
              />
            </div>
            <div className={style.selectorText}>
              ¿Tu envío se perdió en el trayecto o sufrió algún daño? Puedes
              solicitar una indemnización de uno o varios envíos.
            </div>
            <div className={style.selectorButton}>
              <Button onClick={() => history.push('/compensations')}>
                Indemnización
              </Button>
            </div>
          </div>
        </Col>
        <Col col='12' lg='4'>
          <div className={style.selectorContent}>
            <div className={style.selectorTitle}>Solución de problemas</div>
            <div className={style.selectorImageContainer}>
              <img
                src={handsBox}
                alt='Indemnización unitaria'
                className={style.img}
              />
            </div>
            <div className={style.selectorText}>
              ¿Tu envío no pudo ser recepcionado? Puedes resolverlo desde acá
            </div>
            <div className={style.selectorButton}>
              <Button onClick={() => history.push('/problem-solution')}>
                Solución de problemas
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Row>
  );
}
