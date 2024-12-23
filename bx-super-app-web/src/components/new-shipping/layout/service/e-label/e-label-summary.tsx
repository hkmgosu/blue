import { BxTag } from '@bx-design/react-icons';
import { Button } from '@bxreact/button';
import {
  useShippingElabel,
  ShippingElabelReturnedCode,
} from 'emission-lib/hooks/shipping';
import styles from './e-label.module.css';

export function ElabelSummary({
  onReplace,
}: {
  onReplace: () => void;
}): JSX.Element {
  const [elabel, setElabel] = useShippingElabel();

  return elabel.status?.returnedCode === ShippingElabelReturnedCode.ok ? (
    <div className={styles.summary}>
      <header className={styles.summaryHeader}>
        <BxTag></BxTag>
        <h6>
          <strong>eLabel {elabel.value} asociada a este envío</strong>
        </h6>
      </header>
      <footer className={styles.summaryFooter}>
        <Button
          outline
          onClick={() => {
            setElabel({ value: '' });
          }}
        >
          Quitar eLabel
        </Button>
        <Button onClick={onReplace}>Reemplazar eLabel</Button>
      </footer>
    </div>
  ) : (
    <></>
  );
}
