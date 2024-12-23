import { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { retryEmission } from 'api/emissions/retry-emission';
import { Button } from 'components/ui-bx/button';
import { EmissionStoreType } from 'emission-lib/types';
import { usePyme } from 'contexts/pyme/pyme-context';
import { useRepayEmission } from 'emission-lib/hooks/repay';

type Props = {
  paymentId: string;
  to: string;
  newShippingType: 'UNITARY' | 'MULTI' | 'MASSIVE';
};

export default function PaymentRepayButton({
  paymentId,
  to,
}: Props): JSX.Element {
  const history = useHistory();
  const [repayEmissionData, setRepayEmissionData] = useRepayEmission();
  const [isLoading, setIsLoading] = useState(false);
  const [, setIsError] = useState(false);
  const [, setIsSuccess] = useState(false);
  const [, setError] = useState<Error | null>(null);
  const { pymeList } = usePyme();

  const handleRePay = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    setIsSuccess(false);
    setError(null);
    try {
      const res = await retryEmission(paymentId);
      if (pymeList) {
        const newShippingRepayEmission: EmissionStoreType = {
          billingType: res.billingType || 'BILL',
          discount: res.discount || 0,
          emitter: {
            ...res.emitter,
            pyme_name:
              pymeList.find((pym) => pym.id === res.emitter.pyme_id)
                ?.social_reason || '',
          },
          origin: {
            ...res.shipping[0].origin,
            agency_id: res.shipping[0].origin.agency_id || '',
            agency_name: res.shipping[0].origin.agency_name || '',
          },
          promotion_code: res.promotion_code || '',
          promotion_id: res.promotion_id || '',
          refund: {
            ...res.shipping[0].refund,
            agency_id: res.shipping[0].refund.agency_id || '',
            agency_name: res.shipping[0].refund.agency_name || '',
          },
          save_frequent_origin: res.shipping[0].save_frequent_origin,
          shipping: res.shipping.map((ship) => {
            return {
              destiny: {
                ...ship.destiny,
                agency_id: ship.destiny.agency_id || '',
                agency_name: ship.destiny.agency_name || '',
              },
              frequent_alias_client: ship.frequent_alias_client || undefined,
              frequent_alias_package: ship.frequent_alias_package || undefined,
              package: ship.package.map((pack) => {
                return {
                  ...pack,
                  content: pack.content || '',
                  warranty_bill_number: pack.warranty_bill_number || '',
                  warranty_value: pack.warranty_value || 0,
                };
              }),
              receiver: ship.receiver,
              save_frequent_client: ship.save_frequent_client,
              save_frequent_origin: ship.save_frequent_origin,
              save_frequent_package: ship.save_frequent_package,
              save_refund_address: ship.save_refund_address,
            };
          }),
          shipping_price: res.shipping_price || 0,
          tax: res.tax || 0,
          terms_and_conditions_accepted:
            res.terms_and_conditions_accepted || false,
          terms_and_conditions_accepted_date:
            res.terms_and_conditions_accepted_date || undefined,
          total_price: res.total_price,
          warranty: res.warranty || 0,
          withPromotion: res.withPromotion || false,
          emission_type: res.emission_type,
        };
        setRepayEmissionData(newShippingRepayEmission);
        setIsLoading(false);
      }
    } catch (err) {
      setError(err as Error);
      setIsError(true);
      setIsLoading(false);
    }
  }, [paymentId, setRepayEmissionData, pymeList]);

  useEffect(() => {
    if (repayEmissionData) {
      history.push(to);
    }
  }, [repayEmissionData, history, to]);

  return (
    <Button onClick={handleRePay} disabled={isLoading} isLoading={isLoading}>
      Reintentar Pago
    </Button>
  );
}
