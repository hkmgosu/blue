import { useState } from 'react';
import { BxChevronDown, BxPromo } from '@bx-design/react-icons';
import cs from 'classnames';

import { Collapse } from 'components/ui-bx/collapse';
import NewShippingLayoutPromotionalCodeInput from './input';
import NewShippingLayoutPromotionalCodeContent from './content';
import styles from './styles.module.scss';

export default function NewShippingLayoutPromotionalCode(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={styles.card}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.iconBox}>
            <BxPromo size={18} />
          </div>
          <div className={styles.title}>Agrega un código de descuento</div>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.hideDetail}>
            {isOpen ? 'Ocultar detalle' : 'Ver detalle'}
          </div>
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className={styles.buttonCollapse}
          >
            <div
              className={cs(styles.collapseIcon, {
                [styles.collapseIconIsActive]: isOpen,
              })}
            >
              <div className={styles.collapseIconBox}>
                <BxChevronDown color='var(--bx-color-orange)' size={12} />
              </div>
            </div>
          </button>
        </div>
      </header>

      <div className={styles.input}>
        <NewShippingLayoutPromotionalCodeInput />
      </div>
      <div className={styles.codeAlert}>
        Los códigos de descuento no aplican para la opción de envío por pagar
      </div>
      <Collapse in={isOpen}>
        <NewShippingLayoutPromotionalCodeContent />
      </Collapse>
    </div>
  );
}
