import './accordion.css';
import { Collapse } from 'components/ui-bx/collapse';
import { BxChevronDown } from '@bx-design/react-icons';

interface Props {
  show?: Boolean;
  header: any;
  children: any;
  onChange?: (show: boolean) => void;
}

export function Accordion({
  show,
  header,
  children,
  onChange,
}: Props): JSX.Element {
  return (
    <div className={`bx-accordion ${show ? 'bx-accordion--show' : ''}`}>
      <header
        className='bx-accordion_header'
        onClick={() => onChange && onChange(!show)}
      >
        <div className='bx-accordion_header_label'>{header}</div>
        <div className='bx-accordion_header_icon'>
          <BxChevronDown />
        </div>
      </header>
      <Collapse in={!!show}>
        <div className='bx-accordion_content'>{children}</div>
      </Collapse>
    </div>
  );
}
