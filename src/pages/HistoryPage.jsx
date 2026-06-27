import { motion } from 'framer-motion';
import { Download, PencilLine, RefreshCw, Trash2 } from 'lucide-react';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import EmptyState from '../components/common/EmptyState';
import PageHeader from '../components/common/PageHeader';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { useAppContext } from '../context/AppContext';
import { formatDate, formatNumber } from '../utils/formatters';
import { exportSemesterPdf } from '../utils/pdf';

export default function HistoryPage() {
  const navigate = useNavigate();
  const { semesterRecords, deleteSemesterRecord, resetAllRecords, analytics } = useAppContext();

  const sortedRecords = useMemo(
    () => [...semesterRecords].sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt)),
    [semesterRecords]
  );

  const handleEdit = (record) => {
    navigate(`/app/calculator?semester=${record.semesterId}`);
  };

  const handleExport = (record) => {
    exportSemesterPdf(record, analytics.cgpa);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Semester History"
        description="Every saved semester stays available for review, export, or revision whenever you want to refine your academic picture."
        action={
          <Button variant="secondary" onClick={resetAllRecords} disabled={!semesterRecords.length} className="gap-2">
            <RefreshCw size={16} />
            Reset All
          </Button>
        }
      />

      {sortedRecords.length ? (
        <div className="grid gap-5">
          {sortedRecords.map((record) => (
            <motion.div
              key={record.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              <Card className="p-5">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{record.semesterName}</h3>
                      <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300">
                        Saved {formatDate(record.savedAt)}
                      </span>
                    </div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      <div className="rounded-2xl bg-white/70 p-3 dark:bg-slate-900/50">
                        <div className="text-sm text-slate-500 dark:text-slate-400">SGPA</div>
                        <div className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">{formatNumber(record.sgpa)}</div>
                      </div>
                      <div className="rounded-2xl bg-white/70 p-3 dark:bg-slate-900/50">
                        <div className="text-sm text-slate-500 dark:text-slate-400">CGPA at Save</div>
                        <div className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">{formatNumber(record.cgpaAtSave)}</div>
                      </div>
                      <div className="rounded-2xl bg-white/70 p-3 dark:bg-slate-900/50">
                        <div className="text-sm text-slate-500 dark:text-slate-400">Credits</div>
                        <div className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">{formatNumber(record.earnedCredits, 1)} / {formatNumber(record.totalCredits, 1)}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button variant="secondary" onClick={() => handleEdit(record)} className="gap-2">
                      <PencilLine size={16} />
                      Edit
                    </Button>
                    <Button variant="secondary" onClick={() => handleExport(record)} className="gap-2">
                      <Download size={16} />
                      Export PDF
                    </Button>
                    <Button variant="danger" onClick={() => deleteSemesterRecord(record.id)} className="gap-2">
                      <Trash2 size={16} />
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No semesters saved yet"
          description="Once you calculate and save a semester, it will appear here as a polished academic record."
        />
      )}
    </div>
  );
}
