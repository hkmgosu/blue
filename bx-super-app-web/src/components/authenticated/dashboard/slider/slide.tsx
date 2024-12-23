import styles from './slide.module.scss';
import slide1 from './slide-1.png';

export function Slide1(): JSX.Element {
  return (
    <div className={styles.slide}>
      <div className={styles.slideContent}>
        <h1 className={styles.slideTitle}>
          Envía y recibe de
          <br />
          <strong>forma simple</strong>.
        </h1>
        <h3 className={styles.slideText}>
          Tarifa plana Envíos individuales y masivos Solicitudes en línea +1.000
          Puntos Blue Express
        </h3>
      </div>
      <div>
        <img
          src={slide1}
          alt='slide 1'
          className={styles.slideImage}
          loading='lazy'
        />
      </div>
    </div>
  );
}
