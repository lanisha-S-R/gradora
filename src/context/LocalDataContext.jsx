import { createContext, useContext, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { calculateCGPA } from '../utils/calculations';
import { getSemesterById } from '../data/curriculum';
import { DEPARTMENT, REGULATION } from '../data/constants';
import { generateId } from '../utils/storage';
import { useLocalStorage } from '../hooks/useLocalStorage';

const LocalDataContext = createContext(null);

const mapStoredRecord = (record) => ({
  id: record.id,
  semesterId: record.semesterId,
  semesterName: record.semesterName,
  department: record.department,
  regulation: record.regulation,
  subjects: record.subjects,
  totalCredits: record.totalCredits,
  earnedCredits: record.earnedCredits,
  totalWeightedPoints: record.totalWeightedPoints,
  sgpa: record.sgpa,
  cgpaAtSave: record.cgpaAtSave,
  savedAt: record.savedAt,
});

export function LocalDataProvider({ children }) {
  const [storedRecords, setStoredRecords] = useLocalStorage('semester_records', []);
  const [storedSettings, setStoredSettings] = useLocalStorage('user_settings', { targetCgpa: 0, studentName: '' });
  const [dataLoading] = useState(false);

  const semesterRecords = storedRecords.map(mapStoredRecord);
  const settings = storedSettings || { targetCgpa: 0, studentName: '' };

  const analytics = useMemo(() => calculateCGPA(semesterRecords), [semesterRecords]);

  const saveSemesterRecord = async (semesterId, semesterResult) => {
    const semester = getSemesterById(semesterId);
    const existing = semesterRecords.find((item) => item.semesterId === semester.id);

    const payload = {
      id: existing?.id ?? generateId('semester'),
      semesterId: semester.id,
      semesterName: semester.name,
      department: DEPARTMENT,
      regulation: REGULATION,
      subjects: semesterResult.subjects,
      totalCredits: semesterResult.totalCredits,
      earnedCredits: semesterResult.earnedCredits,
      totalWeightedPoints: semesterResult.totalWeightedPoints,
      sgpa: semesterResult.sgpa,
      cgpaAtSave: semesterResult.cgpaAtSave,
      savedAt: new Date().toISOString(),
    };

    const updated = (() => {
      const hasExisting = storedRecords.some((r) => r.id === payload.id);
      if (hasExisting) return storedRecords.map((r) => (r.id === payload.id ? payload : r));
      return [payload, ...storedRecords];
    })();

    setStoredRecords(updated);
    toast.success(existing ? 'Semester updated successfully' : 'Semester saved successfully');
  };

  const deleteSemesterRecord = async (recordId) => {
    const updated = storedRecords.filter((r) => r.id !== recordId);
    setStoredRecords(updated);
    toast.success('Semester deleted');
  };

  const resetAllRecords = async () => {
    setStoredRecords([]);
    toast.success('All semester data reset');
  };

  const updateSettings = async (partial) => {
    const next = { ...settings, ...partial };
    setStoredSettings(next);
    toast.success('Settings updated');
  };

  return (
    <LocalDataContext.Provider
      value={{
        semesterRecords,
        saveSemesterRecord,
        deleteSemesterRecord,
        resetAllRecords,
        analytics,
        settings,
        updateSettings,
        dataLoading,
      }}
    >
      {children}
    </LocalDataContext.Provider>
  );
}

export function useLocalData() {
  const context = useContext(LocalDataContext);
  if (!context) throw new Error('useLocalData must be used inside LocalDataProvider');
  return context;
}
