import { FC } from 'react';

const CardHeader: FC = ({ children }) => (
  <div className='card-header'>{children}</div>
);

CardHeader.displayName = 'CardHeader';

export default CardHeader;
