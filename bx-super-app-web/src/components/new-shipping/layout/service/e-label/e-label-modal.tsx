import { Modal, ModalHeader } from '@bxreact/modal';
import { Card } from '@bxreact/card';
import { Button } from '@bxreact/button';
import { useShippingElabel } from 'emission-lib/hooks/shipping';
import styles from './e-label.module.css';
import imgELabel from 'images/e-label.png';

export function ElabelModal(): JSX.Element {
  const [elabel, setElabel] = useShippingElabel();
  const onClosed = (): void => {
    setElabel({ ...elabel, modal: false });
  };
  return (
    <Modal show={elabel.modal} maxWidth='500px' onClosed={onClosed}>
      <Card padding='md'>
        <ModalHeader>{''}</ModalHeader>
        <div className={styles.modalCard}>
          <img src={imgELabel} alt='elabel' className={styles.modalImg} />
          <header className={styles.modalHeader}>
            <h2>
              <strong>Código eLabel</strong>
            </h2>
            <Button bgcolor='blue' badge>
              BETA
            </Button>
          </header>
          <div>
            <p>
              Estamos testeando esta nueva opción que te permitirá hacer envíos
              sin tener que imprimir etiquetas ni preocuparte del embalaje.
            </p>
            <br />
            <p>
              <strong>
                ¡Te avisaremos cuando esté disponible para que la pruebes!
              </strong>
            </p>
          </div>
          <Button onClick={onClosed}>Cerrar</Button>
        </div>
      </Card>
    </Modal>
  );
}
