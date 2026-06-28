import { Sparkles, Target } from 'lucide-react';
import Card from '../ui/Card';
import ProgressRing from '../common/ProgressRing';
import { useAppContext } from '../../context/AppContext';
import { useLocalData } from '../../context/LocalDataContext';
import { formatNumber } from '../../utils/formatters';

export default function WelcomePanel() {
  const { curriculum } = useAppContext();
  const { analytics, settings } = useLocalData();
  const progress = (analytics.completedSemesters / curriculum.semesters.length) * 100;

  return (
    <Card className="overflow-hidden p-6">
      <div className="grid gap-6 lg:grid-cols-[1.5fr,0.8fr]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300">
            <Sparkles size={14} />
            Premium academic intelligence
          </div>
          <h2 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
            Welcome back, <span className="gradient-text">{settings.studentName}</span>
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
            Track SGPA, monitor CGPA, and stay aligned with your academic target through a clean,
            real-time dashboard built for your AI & Data Science curriculum.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-white/60 p-4 dark:bg-slate-900/50">
              <div className="text-sm text-slate-500 dark:text-slate-400">Department</div>
              <div className="mt-1 font-semibold text-slate-900 dark:text-white">{curriculum.department}</div>
            </div>
            <div className="rounded-2xl bg-white/60 p-4 dark:bg-slate-900/50">
              <div className="text-sm text-slate-500 dark:text-slate-400">Regulation</div>
              <div className="mt-1 font-semibold text-slate-900 dark:text-white">{curriculum.regulation}</div>
            </div>
            <div className="rounded-2xl bg-white/60 p-4 dark:bg-slate-900/50">
              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <Target size={14} />
                Current Goal
              </div>
              <div className="mt-1 font-semibold text-slate-900 dark:text-white">{formatNumber(settings.targetCgpa)} CGPA</div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center rounded-[24px] bg-gradient-to-br from-white/70 to-indigo-50 p-5 dark:from-slate-900/60 dark:to-slate-800/50">
          <ProgressRing value={progress} label="Course Progress" color="#10b981" />
        </div>
      </div>
    </Card>
  );
}
