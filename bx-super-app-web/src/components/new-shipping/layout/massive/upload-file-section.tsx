import { FC, useEffect, useState } from 'react';
import { Row, Col } from '@bx-design/react-grid';
import { Card, CardBody } from 'components/ui-bx/card';
import NewShippingLayoutInfoBox from 'components/new-shipping/layout/info-box';
import UploadSection from './upload-file-section-upload';
import styles from './upload-file-section.module.scss';
import { massive } from 'dictionary';
import {
  useMassiveIsLoading,
  useMassiveError,
  useMassiveProgress,
  useMassiveInputFile,
  useMassiveInProgress,
  useMassiveIsSuccess,
} from 'emission-lib/hooks/massive';
import { MassiveModalProcess } from './modal-process';

const UploadFileSection: FC = () => {
  const [loading] = useMassiveIsLoading();
  const [error, setError] = useMassiveError() as [
    keyof typeof massive.modal,
    any
  ];
  const [, setProgress] = useMassiveProgress();
  const [, setFile] = useMassiveInputFile();
  const [, setShowProgress] = useMassiveInProgress();
  const [, setSuccess] = useMassiveIsSuccess();
  const [showModal, setShowModal] = useState(false);

  const resetFile = (): void => {
    setError(null);
    setFile(null);
    setProgress(0);
    setShowProgress(false);
    setShowModal(false);
    setSuccess(false);
  };

  useEffect(() => {
    if (loading || error) {
      setShowModal(true);
    }
  }, [loading, error]);

  useEffect(() => {
    setError(null);
    setFile(null);
    setProgress(0);
    setShowProgress(false);
    setShowModal(false);
    setSuccess(false);
  }, [
    setError,
    setFile,
    setProgress,
    setShowProgress,
    setShowModal,
    setSuccess,
  ]);

  return (
    <Card>
      <CardBody padding='dashboard'>
        <Row>
          <Col col='12'>
            <div className={styles.infoBox}>
              <NewShippingLayoutInfoBox
                relevant
                title='Se permite un solo tipo de pago por carga de excel. '
                secondaryText={
                  <span>
                    Envíos <strong>prepago a domicilio</strong> y{' '}
                    <strong>por pagar a domicilio</strong> disponibles con Carga
                    Masiva. Envíos con <strong>destino Punto Blue</strong> deben
                    realizarse vía Envío unitario o 2 a 5 Envíos.
                  </span>
                }
              ></NewShippingLayoutInfoBox>
            </div>
          </Col>
          <Col col='12'>
            <h6 className={styles.title}>Carga Masiva</h6>
          </Col>
          <UploadSection />
        </Row>
      </CardBody>
      <MassiveModalProcess
        isOpen={showModal}
        error={error}
        loading={loading}
        onReset={resetFile}
      ></MassiveModalProcess>
    </Card>
  );
};

export default UploadFileSection;
