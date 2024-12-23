import { FC } from 'react';

// import { DarkModeProvider } from './dark-mode-context';
import { AuthProvider } from './auth-context';
import { PymeProvider } from './pyme/pyme-context';
import { AvatarProvider } from './avatar-context';

const AppProvider: FC = ({ children }) => (
  // <DarkModeProvider>
  <AuthProvider>
    <PymeProvider>
      <AvatarProvider>{children}</AvatarProvider>
    </PymeProvider>
  </AuthProvider>
  // </DarkModeProvider>
);

export default AppProvider;
