import { createContext, useContext, useMemo, useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import { curriculum } from '../data/curriculum';
import { calculateCGPA } from '../utils/calculations';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const { theme, toggleTheme, setTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const analytics = useMemo(() => calculateCGPA([]), []);

  const value = {
    curriculum,
    analytics,
    theme,
    toggleTheme,
    setTheme,
    sidebarOpen,
    setSidebarOpen,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used inside AppProvider');
  return context;
}
