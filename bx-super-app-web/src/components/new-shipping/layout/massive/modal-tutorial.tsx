import { useState } from 'react';
import { Modal, ModalBody } from 'components/ui-bx/modal';
import { Checkbox } from 'components/ui-bx/forms';
import { Button } from '@bxreact/button';
import styles from './modal-tutorial.module.css';

const idLocalStorage = 'MassiveModalTutorial';

export function MassiveModalTutorial(): JSX.Element {
  const [checked, setChecked] = useState(false);

  const [isOpen, setItemOpen] = useState(
    () => localStorage.getItem(idLocalStorage) !== 'true'
  );

  return (
    <Modal isOpen={isOpen} toggle={() => {}} centered keyboard={false}>
      <ModalBody>
        <div className={styles.modal}>
          <h3>Plantilla editable</h3>
          <p>
            Haz click sobre las celdas para editarlas sin tener que volver a
            subir el archivo. Recuerda <b>Actualizar información</b> para
            validar los cambios.
          </p>
          <div className='video'>
            <video
              playsInline
              loop
              muted
              autoPlay
              preload=''
              src='https://bx-multimedia-files.s3.amazonaws.com/carga-masiva.mp4'
            ></video>
          </div>
          <div className={styles.row}>
            <Checkbox
              checked={checked}
              onChange={({ target }) => setChecked(target.checked)}
            ></Checkbox>{' '}
            No volver a mostrar este mensaje
          </div>
          <Button
            onClick={() => {
              localStorage.setItem(idLocalStorage, checked + '');
              setItemOpen(false);
            }}
          >
            Aceptar
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
}
