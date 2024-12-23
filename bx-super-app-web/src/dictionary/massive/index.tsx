import { TableCell } from '@bxreact/table';

export const labels = {
  price: 'Precio',
  name: 'Nombre',
  lastName: 'Apellido',
  phone: 'Telefono',
  taxpayerId: 'Rut',
  email: 'Email',
  isPickup: 'Tipo Entrega',
  region: 'Región',
  commune: 'Comuna',
  address: 'Nombre calle',
  addressNumber: 'N° Calle',
  apartmentOffice: 'Dpto / Oficina',
  referenceHelp: 'Referencia ayuda',
  descriptionContent: 'Descripción Contenido',
  valueContent: 'Valor Contenido',
  warranty: 'Garantía',
  invoiceNumber: 'N° Boleta / Factura',
  size: 'Tamaño',
};

export const table = {
  id: '',
  price: (
    <TableCell background='#FF7A00' color='#fff'>
      <span>{labels.price}</span>
    </TableCell>
  ),
  name: (
    <TableCell
      className='table-td-with-icon'
      tooltip={
        <div>
          <strong>Nombre del destinatario: </strong>debes ingresar el Nombre del
          destinatario
        </div>
      }
    >
      <span>{labels.name}</span>
    </TableCell>
  ),
  lastName: (
    <TableCell
      className='table-td-with-icon'
      tooltip={
        <div>
          <strong>Apellido destinatario:</strong>debe ingresar el apellido del
          destinatario
        </div>
      }
    >
      <span>{labels.lastName}</span>
    </TableCell>
  ),
  phone: (
    <TableCell
      className='table-td-with-icon'
      tooltip={
        <div>
          <strong>Teléfono del destinatario: </strong>debe ingresar el teléfono
          del destinatario en formato 56999999999 o 999999999.
        </div>
      }
    >
      <span>{labels.phone}</span>
    </TableCell>
  ),
  taxpayerId: (
    <TableCell
      className='table-td-with-icon'
      tooltip={
        <div>
          <strong>Rut: </strong>ingrese el Rut sin puntos ni guiones. Formato:
          111111111
        </div>
      }
    >
      <span>{labels.taxpayerId}</span>
    </TableCell>
  ),
  email: (
    <TableCell
      className='table-td-with-icon'
      tooltip={
        <div>
          <strong>Correo:</strong> debes ingresar el correo del destinatario en
          formato destinatario@corre.com
        </div>
      }
    >
      <span>{labels.email}</span>
    </TableCell>
  ),
  isPickup: (
    <TableCell
      className='table-td-with-icon'
      tooltip={
        <div>
          <strong>Solo tipo de entrega: </strong>
          Solo disponible entrega <strong>en domicilio</strong> para envíos por
          carga masiva
        </div>
      }
    >
      <span>{labels.isPickup}</span>
    </TableCell>
  ),
  region: (
    <TableCell
      className='table-td-with-icon'
      tooltip={
        <div>
          <strong>Región de Envio: </strong>región de destino al cual se llevará
          el envío
        </div>
      }
    >
      <span>{labels.region}</span>
    </TableCell>
  ),
  commune: (
    <TableCell
      className='table-td-with-icon'
      tooltip={
        <div>
          <strong>Comuna:</strong> seleccione la comuna del envío
        </div>
      }
    >
      <span>{labels.commune}</span>
    </TableCell>
  ),
  address: (
    <TableCell
      className='table-td-with-icon'
      tooltip={
        <div>
          <strong>Nombre calle:</strong> debes ingresar la dirección para la
          entrega en domicilio
        </div>
      }
    >
      <span>{labels.address}</span>
    </TableCell>
  ),
  addressNumber: (
    <TableCell
      className='table-td-with-icon'
      tooltip={
        <div>
          <strong>N° domicilio: </strong>debes ingresar el numero de tu
          domicilioa
        </div>
      }
    >
      <span>{labels.addressNumber}</span>
    </TableCell>
  ),
  apartmentOffice: (
    <TableCell className='table-td-with-icon'>
      {labels.apartmentOffice}
    </TableCell>
  ),
  referenceHelp: (
    <TableCell
      className='table-td-with-icon'
      tooltip={
        <div>
          <strong>Referencia ayuda: </strong>detalle de referencia soporte para
          courier
        </div>
      }
    >
      <span>{labels.referenceHelp}</span>
    </TableCell>
  ),
  descriptionContent: (
    <TableCell
      className='table-td-with-icon'
      tooltip={
        <div>
          <strong>Descripción Contenido: </strong>debes describir el contenido
          del envío.
        </div>
      }
    >
      <span>{labels.descriptionContent}</span>
    </TableCell>
  ),
  valueContent: (
    <TableCell
      className='table-td-with-icon'
      tooltip={
        <div>
          <strong>Valor Contenido: </strong>debes declarar el valor del
          contenido. Si el numero de boleta y el valor declarado en este momento
          no coinciden con el documento a enviar en caso de indemnización, esta
          solicutud será rechazada
        </div>
      }
    >
      <span>{labels.valueContent}</span>
    </TableCell>
  ),
  warranty: (
    <TableCell
      className='table-td-with-icon'
      tooltip={
        <div>
          <strong>¿Quieres Garantía? </strong>
          Si tu carga supera los $85.000 puedes optar por un seguro con un cobro
          adicional. En caso de no contar con seguro cubriremos hasta $85.000.
          Topo carga con seguro 300UF.
        </div>
      }
    >
      <span>{labels.warranty}</span>
    </TableCell>
  ),
  invoiceNumber: (
    <TableCell
      className='table-td-with-icon'
      tooltip={
        <div>
          <strong>Boleta/Factura</strong> del contenido declarado. este campo es
          requerido si estas enviando carga con garantía.
        </div>
      }
    >
      <span>{labels.invoiceNumber}</span>
    </TableCell>
  ),
  size: (
    <TableCell
      className='table-td-with-icon'
      tooltip={
        <div>
          <strong>Tamaño:</strong>debes seleccionar el tamaño de tu envio
          considerando el mayor valor entre el peso físico y volumétrico
        </div>
      }
    >
      <span>{labels.size}</span>
    </TableCell>
  ),
};

export const modal = {
  '95': (
    <span>
      Versión de archivo excel invalida, por favor actualiza descargando a
      ultima versión, haciendo clic en el botón descargar excel.
    </span>
  ),
  '96': (
    <span>
      El archivo que seleccionaste <b>supera el límite de 50 envíos</b>. Puedes
      separar los datos en varios archivos de 50 registros y procesarlos uno a
      la vez.
    </span>
  ),
  '97': (
    <span>
      El archivo que seleccionaste <b>tiene campos obligatorios vacíos</b>. Por
      favor completa todos los campos y vuélvelo a subir.
    </span>
  ),
  '98': (
    <span>
      El archivo que seleccionaste <b>viene vacío</b>. Por favor selecciona otro
      archivo con todos sus campos completos.
    </span>
  ),
  '99': (
    <span>
      El archivo que seleccionaste tiene un <b>formato distinto</b> a nuestra
      plantilla. Por favor selecciona un archivo con extensión .xlsx
    </span>
  ),
  '500': <span>Ups! Error desconocido.</span>,
};
