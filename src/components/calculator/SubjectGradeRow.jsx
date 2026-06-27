import GradeSelect from './GradeSelect';

export default function SubjectGradeRow({ subject, value, onChange, point, weightedPoints }) {
  return (
    <div className="grid gap-3 rounded-2xl border border-white/50 bg-white/60 p-4 dark:border-slate-800 dark:bg-slate-900/50 sm:grid-cols-2 lg:grid-cols-[1.15fr,2.7fr,0.7fr,1fr,0.8fr,0.9fr]">
      <div className="min-w-0">
        <div className="text-xs text-slate-500 dark:text-slate-400">Code</div>
        <div className="mt-1 font-semibold text-slate-900 dark:text-white">{subject.code}</div>
      </div>
      <div className="min-w-0 sm:col-span-2 lg:col-span-1">
        <div className="text-xs text-slate-500 dark:text-slate-400">Subject</div>
        <div className="mt-1 font-medium text-slate-900 dark:text-white">{subject.name}</div>
      </div>
      <div className="min-w-0">
        <div className="text-xs text-slate-500 dark:text-slate-400">Credit</div>
        <div className="mt-1 font-semibold text-slate-900 dark:text-white">{subject.credit}</div>
      </div>
      <div className="min-w-0">
        <div className="text-xs text-slate-500 dark:text-slate-400">Grade</div>
        <div className="mt-1">
          <GradeSelect value={value} onChange={onChange} />
        </div>
      </div>
      <div className="min-w-0">
        <div className="text-xs text-slate-500 dark:text-slate-400">Point</div>
        <div className="mt-3 font-semibold text-slate-900 dark:text-white">{point}</div>
      </div>
      <div className="min-w-0">
        <div className="text-xs text-slate-500 dark:text-slate-400">Weighted</div>
        <div className="mt-3 font-semibold text-slate-900 dark:text-white">{weightedPoints.toFixed(2)}</div>
      </div>
    </div>
  );
}
