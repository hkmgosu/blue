import { useEffect } from 'react';
import { useQueryClient } from 'react-query';

export function useRemoveCache(): void {
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.removeQueries({ queryKey: 'new-shipping-origin-agencies' });
  }, [queryClient]);
}
