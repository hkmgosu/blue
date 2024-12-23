import { ReactNode, useCallback, SyntheticEvent } from 'react';
import { useQueryClient } from 'react-query';

import styles from 'components/new-shipping/layout/summary/summary-submit.module.scss';

import { saveEmission } from 'api/emissions/save-emission';
import { UserType } from 'types/auth';
import { useEmissionId } from 'emission-lib/hooks/emission-state';
import {
  useCreateEmissionError,
  useCreateEmissionIsError,
  useCreateEmissionIsLoading,
  useCreateEmissionIsSuccess,
} from 'emission-lib/hooks/create-emission-state';
import { useCreateEmissionDto } from 'emission-lib/hooks/dto';
import {
  useShippingElabel,
  ShippingElabelReturnedCode,
} from 'emission-lib/hooks/shipping';

type Props = {
  children: ReactNode;
};

function NewShippingLayoutSummarySubmit({ children }: Props): JSX.Element {
  const emission = useCreateEmissionDto();
  const [, setEmissionId] = useEmissionId();
  const [, setIsLoading] = useCreateEmissionIsLoading();
  const [, setIsError] = useCreateEmissionIsError();
  const [, setError] = useCreateEmissionError();
  const [, setIsSuccess] = useCreateEmissionIsSuccess();
  const queryClient = useQueryClient();
  const [elabel] = useShippingElabel();

  const handleSubmit = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      setIsLoading(true);
      setIsError(false);
      setIsSuccess(false);
      setError(null);

      if (emission.shipping[0].save_frequent_origin) {
        queryClient.setQueryData('frequent-origin-by-pyme-id', {
          _id: '1',
          created: new Date(),
          updated: new Date(),
          pyme_id: emission.emitter.pyme_id,
          user_id: queryClient.getQueryData<UserType>('user')?.sub,
          email: emission.emitter.email,
          phone: emission.emitter.phone,
          origin: emission.shipping[0].origin,
          refund: emission.shipping[0].refund,
        });
      }

      try {
        const res = await saveEmission({
          ...emission,
          elabel:
            elabel?.status?.returnedCode === ShippingElabelReturnedCode.ok
              ? elabel.value
              : '',
        });

        if (res.status === 201 || res.status === 200) {
          setEmissionId(res.data.id);
          setIsSuccess(true);
        } else {
          setError('Error al intentar pagar');
          setIsError(true);
          setIsLoading(false);
        }
      } catch (err) {
        setError((err as Error).message);
        setIsError(true);
        setIsLoading(false);
      }
    },
    [
      emission,
      setEmissionId,
      setError,
      setIsError,
      setIsLoading,
      setIsSuccess,
      queryClient,
      elabel,
    ]
  );

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {children}
    </form>
  );
}

export default NewShippingLayoutSummarySubmit;
