import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function Breadcrumb({ children }: Props): JSX.Element {
  return (
    <nav aria-label='breadcrumb'>
      <ol className='breadcrumb-ol '>{children}</ol>
    </nav>
  );
}
