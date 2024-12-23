import { useAuth } from 'contexts/auth-context';
import { useEffect, useState } from 'react';
import { PymeType } from 'types/auth';

type ReturnType = {
  isNaturalPerson: boolean;
  naturalPerson: PymeType | null;
};

export const useIsNaturalPerson = (): ReturnType => {
  const { user } = useAuth();
  const [isNaturalPerson, setIsNaturalPerson] = useState(false);
  const [naturalPerson, setNaturalPerson] = useState<PymeType | null>(null);

  useEffect(() => {
    if (user?.pymes && user.pymes.length > 0) {
      const pyme = user.pymes.find((pyme) => pyme.id === user.default_pyme);
      if (pyme?.is_natural_person) {
        setIsNaturalPerson(true);
        setNaturalPerson(pyme);
      }
    }
  }, [user]);

  return { isNaturalPerson, naturalPerson };
};
