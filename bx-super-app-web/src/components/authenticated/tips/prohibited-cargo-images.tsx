import { Col, Row } from '@bx-design/react-grid';
import { BxExclamation } from '@bx-design/react-icons';
import acidos from 'images/tips/quimicos.png';
import alcoholes from 'images/tips/alcoholes.png';
import combustibles from 'images/tips/combustibles.png';
import explosivos from 'images/tips/explosivos.png';
import radioactivos from 'images/tips/radioactivos.png';
import aerosoles from 'images/tips/aerosoles.png';

type Props = {
  spacing: 'default' | 'reduced';
};

function ProhibitedCargoImages({ spacing }: Props): JSX.Element {
  return (
    <>
      <Row className='justify-center mb-6'>
        <Col
          lg={spacing === 'default' ? '9' : '12'}
          className='hidden lg:block lg:mb-6'
        >
          <div className='text-base text-center tracking-wide'>
            Blue Express <b>no</b> transporta mercaderías peligrosas. <br /> Se
            consideran sustancias o artículos capaces de poner en riesgo la
            salud, seguridad, propiedad o el medio ambiente, tales como:
          </div>
        </Col>
        <Col lg={spacing === 'default' ? '9' : '12'} className='lg:hidden'>
          <div className='flex bg-[#fbfbfb] border-[0.6px] border-[#d6e0ff] rounded-[10px] p-4 mb-8 items-center max-h-[108px]'>
            <BxExclamation color='#FF7E44' size={100} />
            <div className='text-xs flex items-center tracking-wide text-bx-blue pl-2'>
              Son articulos o sustancias capaces de poner en riesgo la salud, la
              seguridad, la propiedad o el medio ambiente.
            </div>
          </div>
          <div className='font-heading text-[15px] text-center text-[#333333] font-bold'>
            Se consideran como cargas prohibidas aquellas sustancias cuya
            peligrosidad es obvia, tales como:{' '}
          </div>
        </Col>
      </Row>
      <Row className='items-center justify-center mb-6'>
        <Col lg='3' className='hidden lg:block'></Col>
        <Col col='6' lg='2' className='lg:mb-6'>
          <div className='flex flex-col items-center'>
            <img src={acidos} alt='Acidos' className='h-[72px]' />
            <p className='mb-[14px] font-heading text-[15px] font-bold'>
              Ácidos
            </p>
          </div>
        </Col>
        <Col col='6' lg='2' className='lg:mb-6'>
          <div className='flex flex-col items-center'>
            <img src={alcoholes} alt='alcoholes' className='h-[72px]' />
            <p className='mb-[14px] font-heading text-[15px] font-bold'>
              Alcoholes
            </p>
          </div>
        </Col>
        <Col col='6' lg='2' className='lg:mb-6'>
          <div className='flex flex-col items-center'>
            <img src={combustibles} alt='combustibles' className='h-[72px]' />
            <p className='mb-[14px] font-heading text-[15px] font-bold'>
              Combustibles
            </p>
          </div>
        </Col>
        <Col lg='3' className='hidden lg:block'></Col>

        <Col lg='3' className='hidden lg:block'></Col>
        <Col col='6' lg='2'>
          <div className='flex flex-col items-center'>
            <img src={explosivos} alt='explosivos' className='h-[72px]' />
            <p className='mb-[14px] font-heading text-[15px] font-bold'>
              Explosivos
            </p>
          </div>
        </Col>
        <Col col='6' lg='2'>
          <div className='flex flex-col items-center'>
            <img src={radioactivos} alt='radioactivos' className='h-[72px]' />
            <p className='mb-[14px] font-heading text-[15px] font-bold'>
              Material <br /> radioactivo
            </p>
          </div>
        </Col>
        <Col col='6' lg='2'>
          <div className='flex flex-col items-center'>
            <img src={aerosoles} alt='aerosoles' className='h-[72px]' />
            <p className='mb-[14px] font-heading text-[15px] font-bold'>
              Aerosoles
            </p>
          </div>
        </Col>
        <Col lg='3' className='hidden lg:block'></Col>
      </Row>
    </>
  );
}

export default ProhibitedCargoImages;
