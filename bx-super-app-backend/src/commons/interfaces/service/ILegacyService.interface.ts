export const LEGACY_SERVICE = 'LEGACY_SERVICE';

export type BaseClientRequest = {
  codigoCliente: string;
  dvCliente: string;
  nombreCliente: string;
  idUsuario?: string;
  nombreContacto: string;
  fonoContacto?: string;
  email: string;
  codigoComuna: string;
  comuna: string;
  codigoCiudad: string;
  ciudad: string;
  calle: string;
  numero: string;
  codigoPostal: string;
};

export type UpdateClientRequest = BaseClientRequest & {
  sucursal?: string;
};

export type CreateClientRequest = BaseClientRequest & {
  tipoCliente: string;
};

export type LegacyClientResult = {
  error?: any;
  isSuccess: boolean;
};

export default interface ILegacyClientService {
  CreateClient(request: CreateClientRequest): Promise<LegacyClientResult>;
  UpdateClient(request: UpdateClientRequest): Promise<LegacyClientResult>;
}
