import { forwardRef, ReactNode, HTMLAttributes } from 'react';
import cs from 'classnames';

type CardProps = {
  marginBottom?: boolean;
  marginTop?: boolean;
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

type Ref = HTMLDivElement;

const Card = forwardRef<Ref, CardProps>(
  ({ marginBottom, marginTop, children }, ref) => {
    return (
      <div
        className={cs('card', {
          'card-margin-bottom': marginBottom,
          'card-margin-top': marginTop,
        })}
        ref={ref}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
