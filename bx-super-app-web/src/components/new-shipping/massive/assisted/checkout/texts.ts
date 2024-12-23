type TextsType = {
  step: number;
  title: string;
  text: string;
};

export const texts: TextsType[] = [
  {
    step: 1,
    title: 'Resumen del envío',
    text: 'Podrás ver el resumen completo de todos tus pedidos. Ahí tendrás una opción para desplegar la información y ver los detalles.',
  },
  {
    step: 2,
    title: 'Detalles del envío',
    text: 'Podrás expandir cada resumen individualmente para revisar el detalle de cada pedido.',
  },
  {
    step: 3,
    title: 'Código de descuento',
    text: 'Puedes agregar un código de descuento a tu pedido. Si el código es válido, puedes desplegar el detalle del descuento para visualizar sus características.',
  },
  {
    step: 4,
    title: 'Realizar pago',
    text: 'Selecciona el método de pago, acepta nuestros "términos y condiciones" y haz clic en el botón pagar para finalizar.',
  },
];
