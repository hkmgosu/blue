import { forwardRef, ReactNode, HTMLAttributes } from 'react';
import cs from 'classnames';

type Props = {
  children: ReactNode;
  padding?: 'dashboard';
} & HTMLAttributes<HTMLDivElement>;

type Ref = HTMLDivElement;
const CardBody = forwardRef<Ref, Props>(({ children, padding }, ref) => (
  <div
    className={cs('card-body', {
      'card-body-dashboard': padding === 'dashboard',
    })}
    ref={ref}
  >
    {children}
  </div>
));

CardBody.displayName = 'CardBody';

export default CardBody;
