import GradeSelect from './GradeSelect';

export default function SubjectGradeRow({ subject, value, onChange, point, weightedPoints }) {
  return (
    <div className="grid gap-3 rounded-2xl border border-white/50 bg-white/60 p-4 dark:border-slate-800 dark:bg-slate-900/50 lg:grid-cols-[1.3fr,3fr,0.8fr,1fr,1fr,1fr]">
      <div>
        <div className="text-xs text-slate-500 dark:text-slate-400">Code</div>
        <div className="mt-1 font-semibold text-slate-900 dark:text-white">{subject.code}</div>
      </div>
      <div>
        <div className="text-xs text-slate-500 dark:text-slate-400">Subject</div>
        <div className="mt-1 font-medium text-slate-900 dark:text-white">{subject.name}</div>
      </div>
      <div>
        <div className="text-xs text-slate-500 dark:text-slate-400">Credit</div>
        <div className="mt-1 font-semibold text-slate-900 dark:text-white">{subject.credit}</div>
      </div>
      <div>
        <div className="text-xs text-slate-500 dark:text-slate-400">Grade</div>
        <div className="mt-1">
          <GradeSelect value={value} onChange={onChange} />
        </div>
      </div>
      <div>
        <div className="text-xs text-slate-500 dark:text-slate-400">Point</div>
        <div className="mt-3 font-semibold text-slate-900 dark:text-white">{point}</div>
      </div>
      <div>
        <div className="text-xs text-slate-500 dark:text-slate-400">Weighted</div>
        <div className="mt-3 font-semibold text-slate-900 dark:text-white">{weightedPoints.toFixed(2)}</div>
      </div>
    </div>
  );
}
