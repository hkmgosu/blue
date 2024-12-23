import { ReactNode } from 'react';
import Fade from 'components/ui-bx/utils/fade';

type Props = {
  isOpen: boolean;
  children: ReactNode;
};

function NewShippingLayoutFadeContent({
  isOpen,
  children,
}: Props): JSX.Element {
  return (
    <Fade in={isOpen} appear unmountOnExit>
      {children}
    </Fade>
  );
}

export default NewShippingLayoutFadeContent;
