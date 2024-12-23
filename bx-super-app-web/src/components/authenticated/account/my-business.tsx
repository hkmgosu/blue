import { FC, useState } from 'react';
import { Row, Col } from '@bx-design/react-grid';
import { DateTime } from 'luxon';
import cs from 'classnames';
import { BxBuilding } from '@bx-design/react-icons';

import { usePyme } from 'contexts/pyme/pyme-context';
import ConfirmModal from 'pages/authenticated/dashboard/confirm-delete-modal';
import { Card, CardBody, CardHeader } from 'components/ui-bx/card';
import styles from './my-business.module.scss';

const MyBusiness: FC = () => {
  const { pymeList, defaultPyme } = usePyme();
  const realPymes = pymeList?.filter((pyme) => pyme.is_natural_person !== true);

  const [menuIndex, setMenuIndex] = useState<number>(-1);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const ToggleConfirmModal = (): void => {
    if (showConfirmModal) {
      setMenuIndex(-1);
    }

    setShowConfirmModal((prev) => !prev);
  };

  return (
    <>
      <Card marginBottom>
        <CardHeader>
          <div className={styles.cardheaderContent}>
            <h6 className={styles.textName}>
              <span className='inline-flex justify-center items-center mr-2'>
                <BxBuilding />
              </span>
              Mis negocios
            </h6>
          </div>
        </CardHeader>
        <CardBody>
          <Row>
            <Col col='12'>
              {realPymes && !realPymes?.length && (
                <Row>
                  <Col col='12'>Sin Datos</Col>
                </Row>
              )}
              <div className={styles.BoxList}>
                {realPymes &&
                  realPymes?.length > 0 &&
                  realPymes.map((pyme) => (
                    <div
                      className={cs(styles.Box, {
                        [styles.BoxIsActive]: pyme.id === defaultPyme?.id,
                      })}
                      key={pyme.id}
                    >
                      <header className={styles.BoxHeader}></header>
                      <div
                        className={cs(styles.BoxContent, {
                          [styles.BoxContentIsActive]:
                            pyme.id === defaultPyme?.id,
                        })}
                      >
                        <h5 className={styles.BoxContentTitle}>
                          {pyme.social_reason.length > 14
                            ? `${pyme.social_reason.substring(0, 14)} ...`
                            : pyme.social_reason}
                        </h5>
                      </div>
                      <footer
                        className={cs(styles.BoxFooter, {
                          [styles.BoxFooterIsActive]:
                            pyme.id === defaultPyme?.id,
                        })}
                      >
                        <div className={styles.BoxFooterDate}>
                          {pyme.created &&
                            DateTime.fromISO(
                              pyme?.created.toString()
                            ).toLocaleString()}
                        </div>
                      </footer>
                    </div>
                  ))}
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <ConfirmModal
        isOpen={showConfirmModal}
        toggle={ToggleConfirmModal}
        pymeId={menuIndex !== -1 ? realPymes![menuIndex].id : ''}
      />
    </>
  );
};

export default MyBusiness;
