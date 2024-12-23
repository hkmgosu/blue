import { FC, useCallback, useState } from 'react';
import { Col, Row } from '@bx-design/react-grid';
import { BxUpload, BxInfo } from '@bx-design/react-icons';

import styles from './upload-file-section.module.scss';
import { Checkbox } from 'components/ui-bx/forms';
import UploadFile from './upload-file';
import { useMassivePackageDangerous } from 'emission-lib/hooks/massive';
import DangerousMerchandisingModal from 'components/new-shipping/form/package/dangerous-modal';
import { Tooltip } from 'components/ui-bx/tooltip';
import { Button } from 'components/ui-bx/button';

const SectionUpload: FC = () => {
  const [isDangerous, setIsDangerous] = useMassivePackageDangerous();
  const [showModal, setShowModal] = useState<boolean>(false);

  const onToggleModal = useCallback(() => {
    setShowModal((prev) => !prev);
  }, []);
  return (
    <Row>
      <Col col='6'>
        <div className={styles.specialCard}>
          <div className={styles.headerSection}>
            <div className={styles.titleSection}>
              Realiza hasta 50 envíos rápidamente
            </div>
            <div className={styles.subtitleSection}>
              Rellena los datos de envío en nuestra Plantilla Excel y súbela
              para que el sistema procese los datos. Podrás corregir errores en
              pasos siguientes.
            </div>
          </div>
          <div>
            <Button
              variant='outline'
              icon={<BxUpload />}
              href='/assets/templates/plantilla-envio-masivo-bx.xlsx'
              target='_blank'
            >
              Descargar plantilla
            </Button>
          </div>
          <div className={styles.toolTipRow}>
            <span className={styles.toopTip}>
              <Tooltip content='Puedes abrir la plantilla con Excel o con las Hojas de Cálculo de Google. Rellena los campos y guarda la plantilla con un nombre reconocible. '>
                <BxInfo size={16}></BxInfo>
              </Tooltip>
            </span>
            <span>¿Cómo edito la plantilla?</span>
          </div>
        </div>
      </Col>
      <Col col='6'>
        <div className={`${styles.specialCard} ${styles.specialCardRight}`}>
          <div className={styles.headerSection}>
            <div className={styles.titleSection}>Sube tu archivo</div>
            <div className={styles.subtitleSection}>
              <span>Carga aqui la plantilla (.xlsx)</span>.
            </div>
          </div>
          <div className={styles.inputUpload}>
            <UploadFile />
          </div>
          <div className={styles.inputRowCenter}>
            <Checkbox
              onChange={() => setIsDangerous((prev) => !prev)}
              checked={isDangerous}
            />
            <span className={styles.inputLabel}>
              Mi envío no contiene{' '}
              <span className={styles.inputLabelLink} onClick={onToggleModal}>
                Mercancías Peligrosas *
              </span>
              <span className={styles.toopTip}>
                <Tooltip content='Todos los productos considerados Mercancías Peligrosas son rechazados por Blue Express.'>
                  <BxInfo size={16}></BxInfo>
                </Tooltip>
              </span>
            </span>
          </div>
        </div>
      </Col>
      <DangerousMerchandisingModal isOpen={showModal} toggle={onToggleModal} />
    </Row>
  );
};

export default SectionUpload;
