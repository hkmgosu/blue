type OSInfoType = {
  nombre: string;
  rut: string;
  codigoPais: string;
  nombrePais: string;
  codigoRegion: string;
  nombreRegion: string;
  codigoComuna: string;
  nombreComuna: string;
  codigoPosta: string;
  nombrePosta: string;
  codigoBase: string;
  nombreBase: string;
  direccionCompleta: string;
  prefijoTelefono: string | null;
  numeroTelefono: string;
  anexoTelefono: string | null;
  email: string | null;
  latLonDire: string;
};

type MicroEstadosType = {
  codigo: string;
  codigoPieza: string;
  cantidadPiezas: string;
  pesoPiezas: string;
  fecha: string;
  codigoTipo: string;
  nombreTipo: string;
  codigoPosta: string;
  nombrePosta: string;
  descripcion: string;
  tieneFotoExcepcion: string;
  esExcepcion: string;
  latitud: string | number | null;
  longitud: string | number | null;
  latLonOperacional: string;
};

type EmbalajeType = {
  alto: string;
  ancho: string;
  codigoUnidadLongitud: string;
  codigoUnidadMasa: string;
  largo: string;
  masa: string;
  nombreUnidadLongitud: string;
  nombreUnidadMasa: string;
  volumen: string;
};

export type OsType = {
  status: string;
  description: string;
  date: string;
  document: {
    numeroDocumento: number;
    idEspecieValorada: number;
    codigoEmpresa: number;
    razonSocial: string;
    cuentaCliente: string;
    codigoTipoServicio: string;
    nombreTipoServicio: string;
    codigoProducto: string;
    nombreProducto: string;
    nombreTipoDocumento: string;
    observaciones: string | null;
    tieneMercanciasPeligrosas: false;
    fechaCreacion: string;
    codigoMoneda: string;
    valorSeguro: number;
    cantidadPiezas: number;
    siguiendo: boolean;
    tieneImagenDD: boolean;
    remitente: OSInfoType;
    destinatario: OSInfoType;
    embalajeTotalizado: EmbalajeType;
    listaNumerosReferencia: Array<{ valor: string }>;
    listaPinchazosNacionales: MicroEstadosType[];
  };
};
