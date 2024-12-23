import {
  createContext,
  FC,
  useState,
  useEffect,
  useContext,
  useCallback,
  useMemo,
} from 'react';

type ContextType = {
  mode: string;
  toggleMode: (mode: string) => void;
};

const preferDarkQuery = '(prefers-color-scheme: dark)';

const DarkModeContext = createContext({} as ContextType);

const DarkModeProvider: FC = (props) => {
  const [mode, setMode] = useState(
    () =>
      window.localStorage.getItem('colorMode') ||
      (window.matchMedia(preferDarkQuery).matches ? 'dark' : 'light')
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(preferDarkQuery);
    const handleChange = (): void =>
      setMode(mediaQuery.matches ? 'dark' : 'light');
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    window.localStorage.setItem('colorMode', mode);
  }, [mode]);

  useEffect(() => {
    mode === 'dark'
      ? document.body.classList.add('dark-mode')
      : document.body.classList.remove('dark-mode');
  }, [mode]);

  const toggleMode = useCallback((modeToSet: string) => setMode(modeToSet), []);

  const values = useMemo(() => ({ mode, toggleMode }), [mode, toggleMode]);

  return <DarkModeContext.Provider value={values} {...props} />;
};

function useDarkMode(): ContextType {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }

  return context;
}

export { DarkModeProvider, useDarkMode };
