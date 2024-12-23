import styles from './slide-img.module.css';

export function SlideImg({
  src,
  srcMobile,
}: {
  src: string;
  srcMobile?: string;
}): JSX.Element {
  return (
    <picture>
      {srcMobile && <source srcset={srcMobile} media='(max-width: 768px)' />}
      <img className={styles.slide} src={src} alt='slide' />
    </picture>
  );
}
