import styles from './size-warning-text.module.scss';

function NewShippingLayoutSizeWarning(): JSX.Element {
  return (
    <div className={styles.warningText}>
      - Carga mal notificada será retenida y puede llegar al bloqueo de la
      cuenta.
      <br />
      * Peso máximo de 16 y 60 cm por arista. <br /> * Los tamaños
      estandarizados son seleccionados según el mayor valor entre peso físico
      (kg) y volumétrico (largo*ancho*alto/4.000).
    </div>
  );
}

export default NewShippingLayoutSizeWarning;
