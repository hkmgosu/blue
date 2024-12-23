import { useState, useEffect } from 'react';
import { Row, Col } from '@bx-design/react-grid';

import styles from 'components/new-shipping/layout/agencies/agencies.module.css';
import { useAgenciesByCommuneCode } from 'hooks/locations/use-agencies-by-commune-code';
import NewShippingLayoutInfoBox from 'components/new-shipping/layout/info-box';
import NewShippingLayoutPickupList from 'components/new-shipping/layout/pickup/pickup-list';
import { useOrigin } from 'emission-lib/hooks/origin';
import Popup from './popup/index';

type Props = {
  cacheKey: string;
};

function NewShippingLayoutAgencies({ cacheKey }: Props): JSX.Element {
  const [origin] = useOrigin();
  const [title, setTitle] = useState(
    'Una vez seleccionada tu región y comuna, podrás visualizar los puntos Blue Express disponibles.'
  );
  const { agencies, refetch } = useAgenciesByCommuneCode({
    commune_code: origin.address.commune.code,
    cacheKey: cacheKey,
  });

  useEffect(() => {
    if (agencies && !agencies.length) {
      setTitle(
        '¡Lo sentimos! Por el momento no tenemos un punto Blue Express disponible en esta zona. Te invitamos a buscar una comuna cercana.'
      );
    }
  }, [origin.address.commune.code, agencies]);

  useEffect(() => {
    refetch();
  }, [origin.address.commune.code, refetch]);

  return (
    <Row gX='3'>
      <Col col='12'>
        <Popup />
      </Col>
      <Col col='12' xl='12' className='mb-12 xl:mb-0'>
        <Row>
          <Col col='12' className='mb-6 xl:mb-0'>
            <div className={styles.searchText}>
              <div className={styles.agenciesSearchText}>
                Resultados de la búsqueda
              </div>
            </div>
          </Col>
          <Col col='12'>
            <div className={styles.agencies}>
              {agencies?.length} Puntos Blue Express
            </div>
            <div className={styles.line} />
          </Col>
          <Col col='12'>
            {agencies && agencies?.length > 0 ? (
              <NewShippingLayoutPickupList agencies={agencies} />
            ) : (
              <NewShippingLayoutInfoBox title={title} />
            )}
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default NewShippingLayoutAgencies;
