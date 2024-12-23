import { useCallback } from 'react';
import { useAtom } from 'jotai';
import { useHistory } from 'react-router-dom';

import { submitAtom, isValidAtom } from 'atoms/price-quote';
import { Button } from 'components/ui-bx/button';
import { Col } from '@bx-design/react-grid';

function PriceQuoteSubmit(): JSX.Element {
  const history = useHistory();
  const [submitPriceQuote] = useAtom(submitAtom);
  const [isValid] = useAtom(isValidAtom);

  const handleSubmit = useCallback(() => {
    history.push('/price-quote/result', submitPriceQuote);
  }, [history, submitPriceQuote]);

  return (
    <Col col='12' xl='3'>
      <Button fullWidth onClick={handleSubmit} disabled={!isValid}>
        Cotizar
      </Button>
    </Col>
  );
}

export default PriceQuoteSubmit;
