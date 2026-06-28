import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { supabase } from '../lib/supabaseClient';
import { calculateCGPA } from '../utils/calculations';
import { getSemesterById } from '../data/curriculum';
import { DEPARTMENT, REGULATION } from '../data/constants';
import { generateId } from '../utils/storage';
import { useAuth } from './AuthContext';

const SupabaseDataContext = createContext(null);

const mapDatabaseRecord = (record) => ({
  id: record.id,
  semesterId: record.semester_id,
  semesterName: record.semester_name,
  department: record.department,
  regulation: record.regulation,
  subjects: record.subjects,
  totalCredits: record.total_credits,
  earnedCredits: record.earned_credits,
  totalWeightedPoints: record.total_weighted_points,
  sgpa: record.sgpa,
  cgpaAtSave: record.cgpa_at_save,
  savedAt: record.saved_at,
});

export function SupabaseDataProvider({ children }) {
  const { user } = useAuth();
  const [semesterRecords, setSemesterRecords] = useState([]);
  const [settings, setSettings] = useState({ targetCgpa: 0, studentName: '' });
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) {
        setSemesterRecords([]);
        setSettings({ targetCgpa: 0, studentName: '' });
        setDataLoading(false);
        return;
      }

      setDataLoading(true);
      const [{ data: records, error: recordsError }, { data: settingsData, error: settingsError }] = await Promise.all([
        supabase
          .from('semester_records')
          .select('*')
          .eq('user_id', user.id)
          .order('saved_at', { ascending: false }),
        supabase
          .from('user_settings')
          .select('target_cgpa, student_name')
          .eq('user_id', user.id)
          .single(),
      ]);

      if (recordsError) {
        toast.error('Unable to load semester history');
      } else {
        setSemesterRecords((records ?? []).map(mapDatabaseRecord));
      }

      if (settingsError && settingsError.code !== 'PGRST116') {
        toast.error('Unable to load settings');
      } else if (settingsData) {
        setSettings({
          targetCgpa: settingsData.target_cgpa ?? 0,
          studentName: settingsData.student_name ?? '',
        });
      } else {
        setSettings({ targetCgpa: 0, studentName: '' });
      }

      setDataLoading(false);
    };

    fetchUserData();
  }, [user]);

  const analytics = useMemo(() => calculateCGPA(semesterRecords), [semesterRecords]);

  const saveSemesterRecord = async (semesterId, semesterResult) => {
    if (!user) return;

    const semester = getSemesterById(semesterId);
    const existing = semesterRecords.find((item) => item.semesterId === semester.id);

    const payload = {
      id: existing?.id ?? generateId('semester'),
      user_id: user.id,
      semester_id: semester.id,
      semester_name: semester.name,
      department: DEPARTMENT,
      regulation: REGULATION,
      subjects: semesterResult.subjects,
      total_credits: semesterResult.totalCredits,
      earned_credits: semesterResult.earnedCredits,
      total_weighted_points: semesterResult.totalWeightedPoints,
      sgpa: semesterResult.sgpa,
      cgpa_at_save: semesterResult.cgpaAtSave,
      saved_at: new Date().toISOString(),
    };

    const { error } = await supabase.from('semester_records').upsert(payload, { onConflict: 'id' });
    if (error) {
      toast.error('Could not save semester record');
      return;
    }

    const record = mapDatabaseRecord(payload);
    setSemesterRecords((prev) => {
      const hasExisting = prev.some((item) => item.id === record.id);
      if (hasExisting) {
        return prev.map((item) => (item.id === record.id ? record : item));
      }
      return [record, ...prev];
    });

    toast.success(existing ? 'Semester updated successfully' : 'Semester saved successfully');
  };

  const deleteSemesterRecord = async (recordId) => {
    if (!user) return;
    const { error } = await supabase.from('semester_records').delete().eq('id', recordId).eq('user_id', user.id);
    if (error) {
      toast.error('Could not delete semester record');
      return;
    }
    setSemesterRecords((prev) => prev.filter((record) => record.id !== recordId));
    toast.success('Semester deleted');
  };

  const resetAllRecords = async () => {
    if (!user) return;
    const { error } = await supabase.from('semester_records').delete().eq('user_id', user.id);
    if (error) {
      toast.error('Could not reset records');
      return;
    }
    setSemesterRecords([]);
    toast.success('All semester data reset');
  };

  const updateSettings = async (partial) => {
    if (!user) return;
    const { error } = await supabase.from('user_settings').upsert(
      {
        user_id: user.id,
        target_cgpa: partial.targetCgpa,
        student_name: partial.studentName,
      },
      { onConflict: 'user_id' }
    );

    if (error) {
      toast.error('Could not update settings');
      return;
    }

    setSettings((prev) => ({ ...prev, ...partial }));
    toast.success('Settings updated');
  };

  return (
    <SupabaseDataContext.Provider
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
    </SupabaseDataContext.Provider>
  );
}

export function useSupabaseData() {
  const context = useContext(SupabaseDataContext);
  if (!context) throw new Error('useSupabaseData must be used inside SupabaseDataProvider');
  return context;
}
