/**
 * @todo  refactorozar tipo segun la data acordada con Erick
 *
 * Este Atom está destinado a agrupar los datos necesarios
 * para la solicitud cierre de carga massiva
 */
import { useAtom, SetStateAction } from 'jotai';

import { shippingsFocusAtom } from '../../store';
import { ShippingStoreType } from '../../types';

export function useShippingsAtom(): [
  ShippingStoreType[],
  (update: SetStateAction<ShippingStoreType[]>) => void
] {
  return useAtom(shippingsFocusAtom);
}
