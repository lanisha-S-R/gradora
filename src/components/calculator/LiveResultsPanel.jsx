import { Award, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';
import Card from '../ui/Card';
import ProgressRing from '../common/ProgressRing';
import { formatNumber } from '../../utils/formatters';
import { getPerformanceBadge } from '../../utils/calculations';

export default function LiveResultsPanel({ result }) {
  const badge = getPerformanceBadge(result.sgpa);

  useEffect(() => {
    if (result.allGradesEntered && result.sgpa >= 9) {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.65 },
      });
    }
  }, [result.allGradesEntered, result.sgpa]);

  const message =
    result.sgpa >= 9
      ? 'Exceptional performance. You are setting a very strong academic standard.'
      : result.sgpa >= 8
      ? 'Excellent momentum. Keep the consistency across upcoming semesters.'
      : result.sgpa >= 7
      ? 'Solid progress. A few stronger grades can push you into the top tier.'
      : 'Stay focused. Small improvements in each subject will compound well.';

  return (
    <Card className="p-5">
      <div className="flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-300">
        <Sparkles size={16} />
        Live Results
      </div>

      <div className="mt-5 flex justify-center">
        <ProgressRing value={(result.sgpa / 10) * 100} label="SGPA Score" color="#4f46e5" />
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl bg-white/70 p-4 dark:bg-slate-900/50">
          <div className="text-sm text-slate-500 dark:text-slate-400">SGPA</div>
          <div className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{formatNumber(result.sgpa)}</div>
        </div>
        <div className="rounded-2xl bg-white/70 p-4 dark:bg-slate-900/50">
          <div className="text-sm text-slate-500 dark:text-slate-400">Credits Earned</div>
          <div className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{formatNumber(result.earnedCredits, 1)}</div>
        </div>
        <div className="rounded-2xl bg-white/70 p-4 dark:bg-slate-900/50">
          <div className="text-sm text-slate-500 dark:text-slate-400">Percentage</div>
          <div className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{formatNumber(result.percentage)}%</div>
        </div>
        <div className="rounded-2xl bg-white/70 p-4 dark:bg-slate-900/50">
          <div className="text-sm text-slate-500 dark:text-slate-400">Average Grade Point</div>
          <div className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{formatNumber(result.averageGradePoint)}</div>
        </div>
      </div>

      <div className="mt-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-indigo-500/10 to-purple-500/10 p-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
          <Award size={16} />
          Performance Badge: {badge.label}
        </div>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{message}</p>
      </div>
    </Card>
  );
}
