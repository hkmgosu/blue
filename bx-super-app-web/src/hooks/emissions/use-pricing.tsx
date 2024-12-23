import { useState, useEffect, useCallback } from 'react';

import { getPrice } from 'api/emissions/price';
import type { CalculatePricingType } from 'types/emissions';

type UsePrincingReturn = {
  price: number;
  isLoading: boolean;
  refetch: () => void;
};

const usePricing = (data: CalculatePricingType): UsePrincingReturn => {
  const [price, setPrice] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);

  useEffect(() => {
    const asyncFetch = async (): Promise<void> => {
      setIsLoading(true);
      try {
        const res = await getPrice(data);
        setPrice(res.price);
        setIsLoading(false);
      } catch (error) {
        setPrice(0);
        setIsLoading(false);
      }
    };
    if (data.distance !== 0) {
      asyncFetch();
    }
  }, [data]);

  useEffect(() => {
    if (isRefetching && data.distance !== 0) {
      const asyncFetch = async (): Promise<void> => {
        setIsLoading(true);
        try {
          const res = await getPrice(data);
          setPrice(res.price);
          setIsLoading(false);
          setIsRefetching(false);
        } catch (error) {
          setPrice(0);
          setIsLoading(false);
          setIsRefetching(false);
        }
      };
      asyncFetch();
    }
  }, [data, isRefetching]);

  const refetch = useCallback(() => {
    setIsRefetching(true);
  }, []);

  return {
    price: data.service.length === 0 ? 0 : price,
    isLoading,
    refetch,
  };
};

export { usePricing };
