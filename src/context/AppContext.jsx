import { createContext, useContext, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { curriculum, getSemesterById } from '../data/curriculum';
import { DEPARTMENT, REGULATION, STORAGE_KEYS } from '../data/constants';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useTheme } from '../hooks/useTheme';
import { calculateCGPA } from '../utils/calculations';
import { generateId } from '../utils/storage';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const { theme, toggleTheme, setTheme } = useTheme();
  const [semesterRecords, setSemesterRecords] = useLocalStorage(STORAGE_KEYS.semesters, []);
  const [settings, setSettings] = useLocalStorage(STORAGE_KEYS.settings, {
    targetCgpa: 9,
    studentName: 'Scholar',
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const analytics = useMemo(() => calculateCGPA(semesterRecords), [semesterRecords]);

  const saveSemesterRecord = (semesterId, semesterResult) => {
    const semester = getSemesterById(semesterId);
    const existing = semesterRecords.find((item) => item.semesterId === semester.id);

    const newRecord = {
      id: existing?.id ?? generateId('semester'),
      semesterId: semester.id,
      semesterName: semester.name,
      department: DEPARTMENT,
      regulation: REGULATION,
      ...semesterResult,
      savedAt: new Date().toISOString(),
    };

    const updated = existing
      ? semesterRecords.map((item) => (item.semesterId === semester.id ? newRecord : item))
      : [...semesterRecords, newRecord];

    setSemesterRecords(updated);
    toast.success(existing ? 'Semester updated successfully' : 'Semester saved successfully');
  };

  const deleteSemesterRecord = (recordId) => {
    setSemesterRecords((prev) => prev.filter((record) => record.id !== recordId));
    toast.success('Semester deleted');
  };

  const resetAllRecords = () => {
    setSemesterRecords([]);
    toast.success('All semester data reset');
  };

  const updateSettings = (partial) => {
    setSettings((prev) => ({ ...prev, ...partial }));
    toast.success('Settings updated');
  };

  const value = {
    curriculum,
    semesterRecords,
    saveSemesterRecord,
    deleteSemesterRecord,
    resetAllRecords,
    analytics,
    settings,
    updateSettings,
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
