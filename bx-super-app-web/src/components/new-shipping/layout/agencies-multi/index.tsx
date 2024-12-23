import { useState, useEffect } from 'react';
import { Row, Col } from '@bx-design/react-grid';

import styles from 'components/new-shipping/layout/agencies-multi/agencies.module.css';
import { useAgenciesByCommuneCode } from 'hooks/locations/use-agencies-by-commune-code';
import NewShippingLayoutInfoBox from 'components/new-shipping/layout/info-box';
import NewShippingLayoutDestinyPickupList from 'components/new-shipping/layout/destiny/pickup-list';
import { useShippingDestinyAddressCommune } from 'emission-lib/hooks/shipping-destiny';

type Props = {
  cacheKey: string;
};

function NewShippingLayoutAgenciesMulti({ cacheKey }: Props): JSX.Element {
  const [pickupCommune] = useShippingDestinyAddressCommune();

  const [title, setTitle] = useState(
    'Una vez seleccionada tu región y comuna, podrás visualizar los puntos Blue Express disponibles.'
  );
  const { agencies, refetch } = useAgenciesByCommuneCode({
    commune_code: pickupCommune.code,
    cacheKey: cacheKey,
  });

  useEffect(() => {
    if (agencies && agencies.length < 1) {
      setTitle(
        '¡Lo sentimos! Por el momento no tenemos un punto Blue Express disponible en esta zona. Te invitamos a buscar una comuna cercana.'
      );
    }
    refetch();
  }, [pickupCommune.code, agencies, refetch]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <Row>
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
            {agencies &&
            agencies?.length > 0 &&
            pickupCommune.base_name !== '' ? (
              <NewShippingLayoutDestinyPickupList agencies={agencies} />
            ) : (
              <NewShippingLayoutInfoBox title={title} />
            )}
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default NewShippingLayoutAgenciesMulti;
