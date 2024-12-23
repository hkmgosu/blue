import { FC } from 'react';
import { BxX } from '@bx-design/react-icons';

import { Modal, ModalBody } from 'components/ui-bx/modal';

type PropTypes = {
  toggle: () => void;
  isOpen: boolean;
};

const WarrantyModal: FC<PropTypes> = ({ isOpen, toggle }) => (
  <Modal isOpen={isOpen} toggle={toggle} centered>
    <ModalBody>
      <div className='flex justify-end items-center'>
        <div
          className='w-[35px] h-[35px] flex justify-center items-center cursor-pointer'
          onClick={toggle}
        >
          <BxX size={25} />
        </div>
      </div>
      <br />
      <p>
        <b>
          Queremos entregarte la mejor experiencia para el envío de tus
          productos a todo Chile y para ello, puedes elegir como quieres
          proteger tu carga.
        </b>
      </p>
      <br />
      <p>
        Todos nuestros envíos poseen una <b>cobertura básica</b> que se
        encuentra incluida sin costo para toda carga cuyo valor sea{' '}
        <b>igual o menor a $85.000.</b>
      </p>
      <br />
      <p>
        Si tu carga supera este monto y deseas que quede protegida frente a
        inconvenientes (Robo, Daño, Extravío, etc.) con un tope superior,
        deberás contratar la <b>Garantía Extendida</b> cuyo costo corresponde al{' '}
        <b>0,6% del valor declarado</b> que será incluido en el costo total de
        tu envío. Con esto,
        <b>aumentarás el tope hasta 300 UF.</b>
      </p>
      <br />
      <p>
        Para hacer válida tu garantía extendida, debes obligatoriamente agregar
        el documento que respalda el valor de tú envío (boleta o factura)".
      </p>
      <br />
      <p>
        Es <b>muy importante</b> que tengas en cuenta que si finalmente decides
        no contratar la Garantía Extendida, cualquier eventual indemnización se
        liquidará hasta el tope de la cobertura básica, es decir hasta $85.000,
        inclusive si la carga tuviese un valor superior.
      </p>
    </ModalBody>
  </Modal>
);

export default WarrantyModal;
