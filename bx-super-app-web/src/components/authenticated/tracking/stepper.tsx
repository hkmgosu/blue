import { FC, useState, useEffect } from 'react';
import { Col } from '@bx-design/react-grid';
import { DateTime } from 'luxon';

import { useTrackingState } from 'contexts/tracking/tracking-context';
import TrackingLine from './track-line';

const MacroStatesOrder = [
  'En Preparación',
  'Retirado',
  'En Camino',
  'Error',
  'Entregado',
];

const adapterDate = (date: DateTime): string =>
  date.toJSDate().toLocaleString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

const TrackingStepper: FC = () => {
  const { os, urlOs } = useTrackingState();
  const [macroIndex, setMacroIndex] = useState<number>(-1);
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    if (os?.status) {
      const actualMacroIndex = MacroStatesOrder.indexOf(os.status);
      setMacroIndex(actualMacroIndex);

      if (os.description) {
        const date = adapterDate(
          DateTime.fromFormat(os.date, 'yyyyMMddHHmmss')
        );
        const dateLimit = adapterDate(
          DateTime.fromFormat(os.date, 'yyyyMMddHHmmss').plus({ days: 5 })
        );

        const _description = os.description
          .replaceAll('[Seller]', os.document.remitente.nombre)
          .replaceAll('[Nombre Receptor]', os.document.destinatario.nombre)
          .replaceAll('[Fecha Entrega]', date)
          .replaceAll('[OS]', urlOs || '')
          .replaceAll('[Origen]', os.document.remitente.direccionCompleta)
          .replaceAll('[Destino]', os.document.destinatario.direccionCompleta)
          .replaceAll(
            '[Dirección Destinatario]',
            os.document.destinatario.direccionCompleta
          )
          .replaceAll(
            'Tu pedido ha sido admitido en el Punto Pick Up de Blue Express ubicado en [Dirección PUDO]',
            'Tu pedido ha sido admitido en el Punto Blue Express'
          )
          .replaceAll('[Fecha Máxima Retiro = +5 días]', dateLimit)
          .replaceAll(
            '[Dirección de Entrega]',
            os.document.destinatario.direccionCompleta
          );

        setDescription(_description);
      }
    }
  }, [os, urlOs]);

  return (
    <Col sm='12'>
      <TrackingLine index={macroIndex} description={description} />
    </Col>
  );
};

export default TrackingStepper;
