type TextsType = {
  step: number;
  title: string;
  text: string;
};

export const texts: TextsType[] = [
  {
    step: 1,
    title: '¿Qué vas a enviar?',
    text: 'Describe el contenido que enviarás con su respectivo valor. ¡No olvides tildar que no llevas mercancías peligrosas! También puedes seleccionar Garantía extendida para proteger tu encomienda en caso de inconvenientes. Para esto, debes colocar el número de boleta/factura.',
  },
  {
    step: 2,
    title: 'Elige el tamaño de tu envío',
    text: 'Te proponemos 3 medidas estándares para hacer tus envíos: S, M o L. Si prefieres, también puedes personalizar las medidas de tus pedidos.',
  },
];
