import { Col, Row } from '@bx-design/react-grid';
import { BxLeft } from '@bx-design/react-icons';
import { tipsViewAtom } from 'atoms/dashboard';
import { Card, CardBody } from 'components/ui-bx/card';
import { useAtom } from 'jotai';

function ServiceExceptions(): JSX.Element {
  const [, setView] = useAtom(tipsViewAtom);
  return (
    <Row className='items-center justify-center'>
      <Col col='12' lg='12' className='mb-2'>
        <div
          className='text-xs font-bold flex items-center text-bx-blue cursor-pointer'
          onClick={() => setView(1)}
        >
          <div className='flex items-center justify-center mr-2'>
            <BxLeft color='var(--bx-color-lblue)' size={20} />
          </div>
          <div>Volver atrás</div>
        </div>
      </Col>
      <Col col='12' lg='12' className='mb-6'>
        <h1 className='font-extrabold text-[26px] mb-6 text-center'>
          Excepciones de servicio
        </h1>
      </Col>
      <Col lg='12'>
        <Card>
          <CardBody padding='dashboard'>
            <Row className='justify-center'>
              <Col col='10' className='mb-12'>
                <div className='font-normal text-base text-bx-black'>
                  En Blue Express siempre haremos nuestro mejor esfuerzo para
                  entregar tus pedidos a tiempo y en óptimas condiciones. Sin
                  embargo, pueden presentarse inconvenientes dentro del proceso
                  que te queremos informar para que sepas que hacer en cada
                  caso. Todos los pedidos son monitoreados por nuestros equipos
                  para evitar retrasos o inconvenientes en el proceso de retiro
                  y entrega. Además, tenemos disponible para ti, un seguimiento
                  en línea y un canal de atención vía WhatsApp para resolver tus
                  dudas. Ambos disponibles a través de la plataforma de envíos
                  Blue Express.
                </div>
              </Col>
              <Col col='10' className='mb-6'>
                <div className='text-[22px] font-black font-heading text-bx-black mb-4'>
                  Excepción Operacional:
                </div>
                <div className='font-normal text-base text-bx-black'>
                  Si en el seguimiento en línea se indica que tu pedido no puede
                  ser entregado por falta o error de información en la dirección
                  de destino, imposibilidad de dar con la ubicación del lugar o
                  problemas de acceso, debes comunicarte a través de nuestro
                  canal de atención Whatsapp, para que nos brindes una solución
                  en un plazo máximo de 48 horas. En caso que la solución no sea
                  ingresada dentro de este periodo de tiempo, será devuelta a la
                  dirección indicada del remitente. Este segundo y último
                  intento de entrega lo realizaremos en hasta 48 horas hábiles
                  posteriores al ingreso de la solución. En caso que tu cliente
                  no se encuentre en el domicilio y no sea posible efectuar la
                  entrega, haremos un segundo y último intento al día siguiente.
                  En caso de no tener éxito devolveremos el pedido a la
                  dirección indicada del remitente. Por último, si tu cliente
                  rechaza el pedido, éste será devuelto a la dirección indicada
                  por el remitente.
                </div>
              </Col>
              <Col col='10' className='mb-6'>
                <div className='text-[22px] font-black font-heading text-bx-black mb-4'>
                  Retraso en la entrega:
                </div>
                <div className='font-normal text-base text-bx-black'>
                  En caso que ocurra un retraso superior a 10 días hábiles,
                  desde la fecha comprometida de entrega, puedes solicitar la
                  devolución del pedido a tus dependencias, mediante el canal de
                  atención WhatsApp. De esta forma, podrás preparar y enviar un
                  nuevo pedido a tu cliente. El plazo de devolución de los
                  pedidos es de un máximo de 15 días hábiles a partir de la
                  fecha en que se realizó la solicitud. En caso qué el pedido no
                  haya sido devuelto en el plazo comprometido, debes ingresar
                  una solicitud de indemnización a través de la plataforma de
                  envíos Blue Express en un plazo de hasta 20 días hábiles
                  posterior al vencimiento del plazo de devolución o un máximo
                  de 45 días hábiles posteriores a la fecha comprometida de
                  entrega. No se aceptarán reclamos qué se realicen en un plazo
                  posterior a las fechas descritas anteriormente.
                </div>
              </Col>
              <Col col='10' className='mb-6'>
                <div className='text-[22px] font-black font-heading text-bx-black mb-4'>
                  Pedido sin movimiento:
                </div>
                <div className='font-normal text-base text-bx-black'>
                  Tenemos una tasa de entregas exitosas muy alta, pero no
                  estamos exentos de situaciones excepcionales. Si tu pedido no
                  presenta movimiento por más de 10 días hábiles, debes ingresar
                  una solicitud de indemnización a través de la plataforma de
                  envíos Blue Express por concepto de extravío, en un plazo
                  máximo de 45 días hábiles posteriores a la fecha comprometida
                  de entrega.
                </div>
              </Col>
              <Col col='10' className='mb-6'>
                <div className='text-[22px] font-black font-heading text-bx-black mb-4'>
                  Daño previo a la entrega:
                </div>
                <div className='font-normal text-base text-bx-black'>
                  En cada etapa del proceso de distribución de tus pedidos,
                  estamos monitoreando el estado de ellos para asegurar entregas
                  exitosas en tiempo y forma. En caso que uno de tus pedidos sea
                  declarado con daño, debes ingresar una solicitud de
                  indemnización por este concepto a través de la plataforma de
                  envíos Blue Express en un plazo máximo de 45 días hábiles
                  posteriores a la fecha prometida de entrega.
                </div>
              </Col>
              <Col col='10' className='mb-6'>
                <div className='text-[22px] font-black font-heading text-bx-black mb-4'>
                  Desconocimiento de entrega, entrega parcial o con daño:
                </div>
                <div className='font-normal text-base text-bx-black'>
                  En caso que tu cliente desconozca una entrega que ha sido
                  confirmada a través del sistema de seguimiento, indique que a
                  la entrega le faltan piezas/paquetes o que el pedido fue
                  entregado con daño (tanto en el producto y/o en el embalaje);
                  debes comunicarte inmediatamente a través de nuestro canal de
                  atención Whatsapp para informar la situación y hacer la
                  solicitud de indemnización a través de la plataforma de envíos
                  Blue Express adjuntando la evidencia del reclamo* efectuado
                  por tu cliente.
                </div>
              </Col>
              <Col col='10' className='mb-6'>
                <div className='text-[22px] font-black font-heading text-bx-black mb-4'>
                  Cobertura sobre tus pedidos:
                </div>
                <div className='font-normal text-base text-bx-black'>
                  Recuerda que todos tus pedidos cuentan con una cobertura
                  básica de hasta $85.000 frente a siniestros o alguno de los
                  inconvenientes descritos anteriormente. Y si lo deseas, puedes
                  obtener una cobertura extendida de hasta 300 UF por un costo
                  adicional de 0,6% sobre el valor declarado del pedido. Una vez
                  recibidas las solicitudes de indemnización, nuestros equipos
                  realizarán el análisis correspondiente y entregarán una
                  respuesta en un plazo máximo de 7 días hábiles, para luego,
                  gestionar el pago de ellas en un plazo de 4 días hábiles a
                  partir de la recepción del finiquito firmado. Para más
                  información sobre nuestras políticas y procedimientos de
                  reclamo puedes acceder a nuestra app.bluex.cl, sección
                  “términos y condiciones del servicio.” *El reclamo de tu
                  cliente debe haberse ejecutado en un plazo máximo de 48 horas
                  hábiles de la supuesta fecha de entrega informada en el
                  sistema de seguimiento.
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}

export default ServiceExceptions;
