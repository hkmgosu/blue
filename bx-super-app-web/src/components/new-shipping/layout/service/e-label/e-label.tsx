import { Button } from '@bxreact/button';
import { Card } from '@bxreact/card';
import { Input } from '@bxreact/input';
import { ElabelRequest } from 'api/emissions/e-label';
import {
  ShippingElabelReturnedCode,
  useShippingElabel,
} from 'emission-lib/hooks/shipping';
import styles from './e-label.module.css';
import { useEffect } from 'react';
export { ElabelModal } from './e-label-modal';
export { ElabelSummary } from './e-label-summary';

export function Elabel(): JSX.Element {
  const [elabel, setElabel] = useShippingElabel();
  const isDisabled =
    elabel.status &&
    elabel.status.returnedCode === ShippingElabelReturnedCode.ok;

  useEffect(() => {
    if (elabel.loading && elabel.value) {
      let cancel: boolean;

      ElabelRequest(elabel.value).then((status) => {
        !cancel && setElabel({ ...elabel, loading: false, status });
      });

      return () => {
        cancel = true;
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elabel.loading, elabel.value]);

  return (
    <Card padding='lg' className={styles.card} deep={2}>
      <header className={styles.header}>
        <h3>
          <strong>Usa un código eLabel</strong>
        </h3>
        <Button
          bgcolor='blue'
          badge
          onClick={() => {
            setElabel({ ...elabel, modal: true });
          }}
        >
          BETA
        </Button>
      </header>
      <form
        className={styles.fields}
        onSubmit={(event) => {
          event.preventDefault();

          !elabel.loading && setElabel({ ...elabel, loading: true });
        }}
      >
        <Input
          value={elabel.value}
          disabled={isDisabled}
          loading={elabel.loading}
          onChange={(event) => {
            setElabel({
              ...elabel,
              value: event.currentTarget.value,
            });
          }}
        ></Input>
        <Button disabled={isDisabled}>Aplicar</Button>
      </form>
      {elabel?.status?.returnedCode === ShippingElabelReturnedCode.ok ? (
        <div className={styles.list}>
          <strong>eLabel {elabel.value} asociada</strong>
          <Button
            size='xs'
            bgcolor='white'
            color='orange'
            onClick={() => {
              setElabel({ value: '' });
            }}
          >
            Quitar
          </Button>
        </div>
      ) : (
        elabel?.status && (
          <div className={styles.error}>
            <strong>{elabel?.status.message}</strong>
          </div>
        )
      )}
    </Card>
  );
}
