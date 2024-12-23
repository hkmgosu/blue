import { ReactNode, useRef } from 'react';

import Fade from 'components/ui-bx/utils/fade';
import { useShippingPackageWarranty } from 'emission-lib/hooks/shipping-package';

type Props = {
  children: ReactNode;
};

function NewShippingLayoutWarrantyShow({ children }: Props): JSX.Element {
  const [warranty] = useShippingPackageWarranty();
  const _div = useRef<HTMLDivElement | null>(null);
  return (
    <Fade in={warranty} appear unmountOnExit ref={_div}>
      <div ref={_div}>{children}</div>
    </Fade>
  );
}

export default NewShippingLayoutWarrantyShow;
