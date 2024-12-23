type TextsType = {
  step: number;
  title: string;
  text: string;
};

export const texts: TextsType[] = [
  {
    step: 1,
    title: 'Resumen del envío',
    text: 'Al revisar el resumen con todos los detalles de tu envío, podrás editar cualquier item o eliminar la información y cargarla nuevamente.',
  },
  {
    step: 2,
    title: 'Código de descuento',
    text: 'Si tienes un código de descuento, puedes agregarlo y, luego, hacer clic en Ver detalle para conocer sus características.',
  },
  {
    step: 3,
    title: 'Realizar pago',
    text: 'Selecciona el método de pago, acepta nuestros "términos y condiciones" y haz clic en el botón pagar para finalizar.',
  },
];
