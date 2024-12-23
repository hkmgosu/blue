import { TextsType } from '../ModalContent';

export const texts: TextsType[] = [
  {
    step: 1,
    title: 'Datos de quien envía',
    text: 'Ingresa la información de la persona a quien le estás enviando el pedido. Es importante colocar la información correcta del destinatario para evitar problemas en la entrega. ',
  },
  {
    step: 2,
    title: 'Datos del destinatario',
    text: 'Si deseas guardar los datos del destinatario, debes activar el switch de guardado. Una vez completes todos los datos del destinatario de tu pedido, serán guardados en la libreta Destinatario frecuente al terminar el proceso de envío.',
  },
  {
    step: 3,
    title: 'Dirección del destino',
    text: 'Luego de completar la información del destinatario, deberás especificar el tipo de entrega que te gustaría realizar. Puedes elegir entre dos opciones: la primera, es que el destinatario retire en uno de nuestros Puntos Blue Express; y la segunda, es que llevemos el pedido a una dirección específica.  ',
  },
  {
    step: 4,
    title: 'Dirección del destino ',
    text: 'Si escoges Domicilio, debes completar la dirección exacta indicando calle, avenida, pasaje/número, departamento/oficina. También puedes colocar una referencia que nos ayude a entregar tu encomienda con más exactitud.',
  },
  {
    step: 5,
    title: 'Dirección del destino',
    text: 'Al escoger como destino Punto Blue Express, dejaremos la encomienda para tu destinatario en el Punto seleccionado.',
  },
];
