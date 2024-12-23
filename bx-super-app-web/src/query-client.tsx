import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const reactQueryTools = process.env.NODE_ENV === 'development' && (
  <ReactQueryDevtools initialIsOpen={false} />
);

type Props = {
  children: ReactNode;
};

export default function QueryClientProviderRoot({
  children,
}: Props): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {reactQueryTools}
    </QueryClientProvider>
  );
}
