import { ApiProperty } from '@nestjs/swagger';

export default class ClientUpdatedModel {
  @ApiProperty()
  timestamp: string;
  @ApiProperty()
  operation: string;
  @ApiProperty()
  payload: {
    request: {
      codigoCliente: string;
      dvCliente: string;
      sucursal: string;
      nombreCliente: string;
      tipoCliente: string;
      idUsuario: string;
      nombreContacto: string;
      fonoContacto: string;
      email: string;
      codigoComuna: string;
      comuna: string;
      codigoCiudad: string;
      ciudad: string;
      calle: string;
      numero: string;
      codigoPostal: string;
    };
    response: {
      cuentaCorriente: string;
      sucursal: string;
      tipoCliente: string;
      error: { codigo: number; mensaje: string };
    };
  };
}
