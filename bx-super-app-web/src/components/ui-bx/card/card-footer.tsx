import { FC } from 'react';

const CardFooter: FC = ({ children }) => (
  <div className='card-footer'>{children}</div>
);

CardFooter.displayName = 'CardFooter';

export default CardFooter;
