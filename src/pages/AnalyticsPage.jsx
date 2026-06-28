import { motion } from 'framer-motion';
import { BarChart3, TrendingDown, TrendingUp } from 'lucide-react';
import { useMemo } from 'react';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import PageHeader from '../components/common/PageHeader';
import ProgressRing from '../components/common/ProgressRing';
import StatCard from '../components/common/StatCard';
import Card from '../components/ui/Card';
import { useSupabaseData } from '../context/SupabaseDataContext';
import { calculateTargetGpa } from '../utils/calculations';
import { formatNumber } from '../utils/formatters';

export default function AnalyticsPage() {
  const { semesterRecords, analytics, settings } = useSupabaseData();

  const sortedRecords = useMemo(
    () => [...semesterRecords].sort((a, b) => a.semesterId - b.semesterId),
    [semesterRecords]
  );

  const trendData = sortedRecords.map((record) => ({
    name: record.semesterName.replace('Semester ', 'S'),
    sgpa: Number(formatNumber(record.sgpa)),
    cgpa: Number(formatNumber(record.cgpaAtSave || record.sgpa)),
  }));

  const creditData = sortedRecords.map((record) => ({
    name: record.semesterName.replace('Semester ', 'S'),
    credits: Number(record.earnedCredits || 0),
  }));

  const targetGpa = calculateTargetGpa(
    analytics.totalWeightedPoints,
    analytics.completedCredits,
    4,
    settings.targetCgpa
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Analytics"
        description="View semester performance, credit flow, and a simple target GPA calculator to guide what comes next."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Highest Semester" value={analytics.highestSemester ? formatNumber(analytics.highestSemester.sgpa) : '—'} icon={TrendingUp} accent="emerald" hint="Best recorded SGPA" />
        <StatCard title="Lowest Semester" value={analytics.lowestSemester ? formatNumber(analytics.lowestSemester.sgpa) : '—'} icon={TrendingDown} accent="purple" hint="Current floor in your history" />
        <StatCard title="Average GPA" value={formatNumber(analytics.averageGpa)} icon={BarChart3} accent="indigo" hint="Mean of saved semesters" />
        <StatCard title="Target GPA" value={formatNumber(settings.targetCgpa)} icon={BarChart3} accent="amber" hint="Your current academic goal" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr,0.8fr]">
        <Card className="p-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Semester-wise GPA Trend</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">View how SGPA and cumulative GPA evolved across your saved semesters.</p>
            </div>
          </div>
          <div className="mt-5 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.04} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 10]} />
                <Tooltip />
                <Area type="monotone" dataKey="sgpa" stroke="#4f46e5" fill="url(#trendGradient)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Credits Earned Overview</h3>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Understand how your earned credits are distributed across each saved term.</p>
          <div className="mt-5 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={creditData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="credits" fill="#10b981" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="p-5">
        <div className="grid gap-6 lg:grid-cols-[1fr,0.7fr] lg:items-center">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Target GPA Calculator</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              If you want to reach your goal of {formatNumber(settings.targetCgpa)} CGPA, the next semester would need a GPA of {targetGpa !== null ? formatNumber(targetGpa) : '—'} on a 4-credit load.
            </p>
          </div>
          <div className="flex items-center justify-center rounded-[24px] bg-gradient-to-br from-indigo-50 to-purple-50 p-4 dark:from-slate-900/50 dark:to-slate-800/50">
            <ProgressRing value={Math.min(100, (settings.targetCgpa / 10) * 100)} label="Goal Alignment" color="#4f46e5" />
          </div>
        </div>
      </Card>
    </div>
  );
}
