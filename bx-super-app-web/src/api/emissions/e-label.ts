import { APIConstants } from 'config';
import type { ShippingElabelStatus } from 'emission-lib/hooks/shipping';
import axiosInstance from 'utils/http-interceptor';

export async function ElabelRequest(
  value: string
): Promise<ShippingElabelStatus> {
  const { data } = await axiosInstance.get<ShippingElabelStatus>(
    `${APIConstants.elabel}${value}`
  );
  return data;
}
