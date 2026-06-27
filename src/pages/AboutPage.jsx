import { BrainCircuit, GraduationCap, Sparkles } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import Card from '../components/ui/Card';
import { APP_NAME, DEPARTMENT, REGULATION } from '../data/constants';

export default function AboutPage() {
  const pillars = [
    'Automatic subject and credit loading based on the selected semester.',
    'Real-time SGPA, CGPA, percentage, and performance badge updates.',
    'Beautiful saved history, analytics, and PDF export for personal review.',
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="About GRADORA"
        description="A refined personal academic system designed to make semester management feel effortless, clear, and premium."
      />

      <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 p-3 text-white">
              <GraduationCap size={20} />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Built for your academic workflow</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{APP_NAME} focuses on one thing: making your semester GPA journey feel premium and frictionless.</p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {pillars.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl bg-white/70 p-3 dark:bg-slate-900/50">
                <Sparkles size={16} className="mt-0.5 text-emerald-500" />
                <p className="text-sm text-slate-600 dark:text-slate-300">{item}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 p-3 text-white">
              <BrainCircuit size={20} />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Current Profile</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Configured for your personal academic context.</p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div className="rounded-2xl bg-white/70 p-4 dark:bg-slate-900/50">
              <div className="text-sm text-slate-500 dark:text-slate-400">Department</div>
              <div className="mt-1 font-semibold text-slate-900 dark:text-white">{DEPARTMENT}</div>
            </div>
            <div className="rounded-2xl bg-white/70 p-4 dark:bg-slate-900/50">
              <div className="text-sm text-slate-500 dark:text-slate-400">Regulation</div>
              <div className="mt-1 font-semibold text-slate-900 dark:text-white">{REGULATION}</div>
            </div>
            <div className="rounded-2xl bg-white/70 p-4 dark:bg-slate-900/50">
              <div className="text-sm text-slate-500 dark:text-slate-400">Supported Semesters</div>
              <div className="mt-1 font-semibold text-slate-900 dark:text-white">Semester I - Semester IV</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
