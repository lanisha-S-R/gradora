import Card from '../ui/Card';
import { useAppContext } from '../../context/AppContext';
import { formatDate, formatNumber } from '../../utils/formatters';

export default function ActivityFeed() {
  const { semesterRecords } = useAppContext();
  const recent = [...semesterRecords]
    .sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt))
    .slice(0, 5);

  return (
    <Card className="p-5">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Recent Activity</h3>
      <div className="mt-5 space-y-4">
        {recent.length ? (
          recent.map((item) => (
            <div key={item.id} className="flex items-start gap-3">
              <div className="mt-1 h-3 w-3 rounded-full bg-emerald-500" />
              <div className="min-w-0">
                <div className="font-medium text-slate-900 dark:text-white">
                  {item.semesterName} saved with SGPA {formatNumber(item.sgpa)}
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400">{formatDate(item.savedAt)}</div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-slate-600 dark:text-slate-300">No recent academic activity yet.</p>
        )}
      </div>
    </Card>
  );
}
