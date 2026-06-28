import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Settings2, Sparkles } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import { useAppContext } from '../context/AppContext';
import { useSupabaseData } from '../context/SupabaseDataContext';
import { formatNumber } from '../utils/formatters';

export default function SettingsPage() {
  const { curriculum } = useAppContext();
  const { settings, updateSettings } = useSupabaseData();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      studentName: settings.studentName || '',
      targetCgpa: settings.targetCgpa || '',
    },
  });

  useEffect(() => {
    reset({
      studentName: settings.studentName || '',
      targetCgpa: settings.targetCgpa || '',
    });
  }, [reset, settings.studentName, settings.targetCgpa]);

  const onSubmit = (values) => {
    updateSettings({
      studentName: values.studentName,
      targetCgpa: Number(values.targetCgpa),
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Tune your academic profile and personalize the target GPA that guides your dashboard."
      />

      <div className="grid gap-6 lg:grid-cols-[0.9fr,1.1fr]">
        <Card className="p-5">
          <div className="flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-300">
            <Sparkles size={16} />
            Academic Profile
          </div>
          <div className="mt-5 space-y-4">
            <div className="rounded-2xl bg-white/70 p-4 dark:bg-slate-900/50">
              <div className="text-sm text-slate-500 dark:text-slate-400">Department</div>
              <div className="mt-1 font-semibold text-slate-900 dark:text-white">{curriculum.department}</div>
            </div>
            <div className="rounded-2xl bg-white/70 p-4 dark:bg-slate-900/50">
              <div className="text-sm text-slate-500 dark:text-slate-400">Regulation</div>
              <div className="mt-1 font-semibold text-slate-900 dark:text-white">{curriculum.regulation}</div>
            </div>
            <div className="rounded-2xl bg-white/70 p-4 dark:bg-slate-900/50">
              <div className="text-sm text-slate-500 dark:text-slate-400">Current Target</div>
              <div className="mt-1 font-semibold text-slate-900 dark:text-white">{formatNumber(settings.targetCgpa)} CGPA</div>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-300">
            <Settings2 size={16} />
            Preferences
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4">
            <Input
              label="Student Name"
              {...register('studentName', { required: true })}
              placeholder="Enter your name"
            />
            <Input
              label="Target CGPA"
              type="number"
              step="0.1"
              min="5"
              max="10"
              {...register('targetCgpa', { required: true, min: 5, max: 10 })}
              placeholder="Enter target CGPA"
            />
            <Button type="submit" className="w-full">Save Preferences</Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
