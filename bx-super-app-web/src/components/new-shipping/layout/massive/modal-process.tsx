import { Modal, ModalBody } from 'components/ui-bx/modal';
import LoadingSection from './upload-file-section-loading';
import imgAlert from 'images/new-shipping/globoalert.png';
import styles from './upload-file-section.module.scss';
import { Button } from 'components/ui-bx/button';
import { massive } from 'dictionary';

export function MassiveModalProcess({
  isOpen,
  error,
  loading,
  onReset,
  titleLoading,
}: {
  isOpen: boolean;
  error: keyof typeof massive.modal | false;
  loading?: boolean;
  titleLoading?: string;
  onReset: () => any;
}): JSX.Element {
  return (
    <Modal isOpen={isOpen} toggle={() => {}} centered keyboard={false}>
      <ModalBody>
        {loading ? (
          <LoadingSection
            title={
              titleLoading ||
              'Estamos validando los datos y las direcciones de tus registros. Podríamos tardar unos minutos.'
            }
          />
        ) : error ? (
          <div className={styles.modalBody}>
            <img src={imgAlert} alt='' />
            {error in massive.modal ? massive.modal[error] : massive.modal[500]}
            <Button onClick={onReset}>Aceptar</Button>
          </div>
        ) : (
          ''
        )}
      </ModalBody>
    </Modal>
  );
}
