import { BookOpen, GraduationCap, Sigma, TrendingUp } from 'lucide-react';
import { useSupabaseData } from '../../context/SupabaseDataContext';
import StatCard from '../common/StatCard';
import { formatNumber } from '../../utils/formatters';

export default function OverviewCards() {
  const { analytics } = useSupabaseData();

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard title="Current CGPA" value={formatNumber(analytics.cgpa)} icon={Sigma} accent="indigo" hint="Weighted cumulative average" />
      <StatCard title="Completed Credits" value={formatNumber(analytics.completedCredits, 1)} icon={BookOpen} accent="emerald" hint="All registered semesters" />
      <StatCard title="Completed Semesters" value={analytics.completedSemesters} icon={GraduationCap} accent="purple" hint="Saved in your academic history" />
      <StatCard title="Average GPA" value={formatNumber(analytics.averageGpa)} icon={TrendingUp} accent="amber" hint="Semester-wise mean performance" />
    </div>
  );
}
